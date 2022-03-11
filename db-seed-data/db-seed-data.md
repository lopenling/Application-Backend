## Description
`db-data.sql.gz` is inital dictionary data ingested into postgres database.

### Data Source
 Initial data is taken from [Padma-Dictionary-Data](https://github.com/Lotus-King-Research/Padma-Dictionary-Data) and converted into SQL format in order to ingest into postgres database.

### Format
  Data exported using [pg_dump](https://www.postgresql.org/docs/12/app-pgdump.html) utility, with native postgres db data format suitable for importing into any SQL database. File is further
  compressed with gzip utlity to significantly reduce its size.

 ### Usage
  This data can be decompressed (gunzip) and imported into a new database instance for the purpose of setting up dev server or server migration. Refer to the [pg_dump](https://www.postgresql.org/docs/12/app-pgdump.html) to learn about commands to import  this data into a database.