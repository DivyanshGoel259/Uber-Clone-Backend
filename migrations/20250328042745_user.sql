-- migrate:up

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);


-- migrate:down

drop table if exists user