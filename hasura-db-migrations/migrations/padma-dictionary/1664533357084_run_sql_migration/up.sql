CREATE TRIGGER add_member 
    AFTER INSERT OR UPDATE ON "organization" 
    FOR EACH ROW EXECUTE PROCEDURE add_org_member();
