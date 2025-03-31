-- migrate:up

CREATE TYPE statusEnum AS ENUM ('active','inactive');
CREATE TYPE vehicleType AS ENUM ('motorcycle','car','auto');

CREATE TABLE captain (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status statusEnum NOT NULL DEFAULT 'inactive',
    vehicleId UUID UNIQUE NOT NULL,
    locationId UUID,
    socketId VARCHAR(255),
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE location (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lat INT NOT NULL,
    lng INT NOT NULL
);

CREATE TABLE vehicle (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    color VARCHAR(30) NOT NULL,
    plate VARCHAR(30) NOT NULL,
    capacity INT NOT NULL,
    type  vehicleType NOT NULL
);

-- migrate:down

DROP TABLE IF EXISTS captain ;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS vehicle;
DROP TYPE IF EXISTS statusEnum CASCADE;
DROP TYPE IF EXISTS vehicleType CASCADE;
