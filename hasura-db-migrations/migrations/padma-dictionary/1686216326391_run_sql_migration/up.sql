CREATE OR REPLACE FUNCTION add_org_member()
    RETURNS trigger AS $BODY$
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            INSERT INTO organization_member values (NEW.admin_id, NEW.id);
            RETURN NEW;
        ELSEIF (TG_OP = 'UPDATE') THEN
            UPDATE organization_member
                SET admin_id = NEW.admin_id,
                    id = NEW.id
                WHERE id = NEW.id;
            RETURN NEW;
        END IF;
        
    END;
    $BODY$ LANGUAGE plpgsql;
    
CREATE TRIGGER add_member 
    AFTER INSERT OR UPDATE ON "organization" 
    FOR EACH ROW EXECUTE PROCEDURE add_org_member();
