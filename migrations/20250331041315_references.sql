-- migrate:up

ALTER TABLE captain
ADD CONSTRAINT vehicleId_fkey
FOREIGN KEY (vehicleId)
REFERENCES vehicle(id);

ALTER TABLE captain
ADD CONSTRAINT locationId_fkey
FOREIGN KEY (locationId)
REFERENCES location(id);



-- migrate:down

ALTER TABLE captain
DROP CONSTRAINT locationId_fkey;

ALTER TABLE captain
DROP CONSTRAINT vehicleId_fkey;

