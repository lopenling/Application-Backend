CREATE OR REPLACE FUNCTION add_org_member()
    RETURNS trigger AS $BODY$
    BEGIN
    INSERT INTO organization_member values (NEW.admin_id, NEW.id);
    RETURN NEW;
    END;
    $BODY$ LANGUAGE plpgsql;
