-- Insert 7 Cities in Delaware
INSERT INTO CITIES (NAME, STATE, POPULATION, MAYOR) VALUES 
('Wilmington', 'Delaware', 71525, 'Mike Purzycki'),
('Dover', 'Delaware', 38079, 'Robin Christiansen'),
('Newark', 'Delaware', 33673, 'Jen Wallace'),
('Middletown', 'Delaware', 23192, 'Kenneth Branner'),
('Smyrna', 'Delaware', 12883, 'Joanne Masten'),
('Milford', 'Delaware', 11463, 'Archie Campbell'),
('Seaford', 'Delaware', 8310, 'David Genshaw');

-- Residential Communities for Wilmington (City ID 1)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Talleyville Commons', 450, 'Subdivision', 1995, true, 1),
('Brandywine Estates', 320, 'Gated Community', 2000, true, 1),
('Riverside Apartments', 180, 'Apartment Complex', 2015, true, 1),
('Trolley Square Condos', 95, 'Condominium', 2010, false, 1);

-- Residential Communities for Dover (City ID 2)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Dover Heights', 280, 'Apartment Complex', 2012, true, 2),
('Capital Green', 150, 'Townhomes', 2008, true, 2),
('Legislative Village', 220, 'Subdivision', 1998, false, 2);

-- Residential Communities for Newark (City ID 3)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('College Park', 380, 'Student Housing', 2005, true, 3),
('Main Street Lofts', 65, 'Loft Apartments', 2018, true, 3),
('Christina Crossing', 190, 'Subdivision', 2002, true, 3);

-- Residential Communities for Middletown (City ID 4)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Seasons', 520, 'Planned Community', 2003, true, 4),
('Summit Bridge Farms', 340, 'Subdivision', 2010, true, 4),
('Whitehall', 280, 'Gated Community', 2015, true, 4);

-- Residential Communities for Smyrna (City ID 5)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Smyrna Meadows', 175, 'Subdivision', 2000, false, 5),
('Duck Creek Village', 130, 'Retirement Community', 2007, true, 5);

-- Residential Communities for Milford (City ID 6)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Mispillion Shores', 145, 'Waterfront Community', 2005, true, 6),
('Milford Meadows', 210, 'Subdivision', 1997, false, 6);

-- Residential Communities for Seaford (City ID 7)
INSERT INTO RESIDENTIAL_COMMUNITIES (NAME, NUMBER_OF_HOMES, TYPE, YEAR_ESTABLISHED, HAS_AMENITIES, CITY_ID) VALUES
('Riverwalk', 95, 'Apartment Complex', 2013, true, 7),
('Seaford Station', 160, 'Mixed Use', 2016, true, 7);

