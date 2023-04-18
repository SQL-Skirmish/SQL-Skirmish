-- create the table where all prompts with corresponding answer will be stored
-- default is the public schema 
-- 
-- psql -d <url from elephantSQL> -f prompts.sql
-- CREATE TABLE products ( ... ); === CREATE TABLE public.products ( ... );

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- query for public.prompts
CREATE TABLE public.prompts (
	"_id" serial NOT NULL UNIQUE,
	"difficulty" varchar NOT NULL,
	"prompt" varchar NOT NULL,
	"answer" varchar NOT NULL,
	CONSTRAINT "prompts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- fill database with all prompts
INSERT INTO public.prompts (_id, difficulty, prompt, answer)
VALUES
    (1, 'easy', 'Write a query to get the population field from the world table for Germany. 
    Note that strings (pieces of text that are data) should be in single quotes',
    'SELECT population FROM world WHERE name = "Germany";'),
    (2, 'easy', 'Write a query to get the name and population fields from the world table for 
    Sweden, Norway, and Denmark', 'SELECT name, population FROM world WHERE name IN 
    ("Sweden", "Norway", "Denmark");'),
    (3, 'easy', 'Write a query which selects all countries with a population between 200,000 
    and 250,000. Show the name and area fields.', 'SELECT name, population FROM world WHERE 
    population BETWEEN 200000 AND 250000;'),
    (4, 'average', 'Find all countries that start with the letter "Y".', 'SELECT name 
    FROM world WHERE name LIKE "Y%";'),
    (5, 'average', 'Find all countries that end with the letter "y".', 'SELECT name FROM 
    world WHERE name LIKE "%y";'),
    (6, 'average', 'Find all countries that contain the letter "x".', 'SELECT name FROM world 
    WHERE name LIKE "%x%";'),
    (7, 'average', 'Find all countries that end with "land".', 'SELECT name FROM world 
    WHERE name LIKE "%land";'),
    (8, 'average', 'Find all countries that start with "C" and end with "ia".', 'SELECT name 
    FROM world WHERE name LIKE "C%ia";'),
    (9, 'average', 'Find all countries that has "oo" in the name.', 'SELECT name FROM world 
    WHERE name LIKE "%oo%";'),
    (10, 'average', 'Find all countries that have 3 or more "a" in its name.', 'SELECT name 
    FROM world WHERE name LIKE "%a%a%a%";'),
    (11, 'average', 'Find all countries that have "t" as its second letter. Arrange the data 
    according to name.', 'SELECT name FROM world WHERE name LIKE "_t%" ORDER BY name;'),
    (12, 'average', 'Find all countries that have 2 "o" character separated by 2 other 
    characters (ex. Moldova).', 'SELECT name FROM world WHERE name LIKE "%o__o%";'),
    (13, 'average', 'Find all countries that have exactly 4 characters.', 'SELECT name FROM 
    world WHERE name LIKE "____";'),
    (14, 'average', 'Find all countries where the capital city has the same name as the 
    country.', 'SELECT name FROM world WHERE name = capital;'),
    (15, 'average', 'Find all countries where the capital is the name of the country plus 
    "City" (ex. Mexico -> Mexico City).', 'SELECT name FROM world WHERE 
    capital = concat(name, " City");'),
    (16, 'average', 'Find the capital and name of countries where the capital includes the 
    name of the country.', 'SELECT capital,name FROM world WHERE capital LIKE 
    concat("%", name, "%");'),
    (17, 'hard', 'Find the capital and the name where the capital is an extension of name 
    of the country. You should include Mexico City as it is longer than Mexico. You should 
    not include Luxembourg as the capital is the same as the country.', 'SELECT capital, name 
    FROM world WHERE capital LIKE concat(name, "%") AND capital <> name;'),
    (18, 'hard', 'For Monaco-Ville the name is Monaco and the extension is -Ville. Show the 
    name and the extension where the capital is an extension of name of the country. You can 
    use the SQL function REPLACE.', 'SELECT name, REPLACE(capital, name, "") FROM world 
    WHERE capital LIKE concat("%", name, "%") AND capital > name;'),
    (19, 'easy', 'Write a query to get the name, capital, and population fields from the 
    world table.', 'SELECT name, capital, population FROM world;'),
    (20, 'easy', 'List each country name where the population is larger than that of "Russia"', 
    'SELECT name FROM world WHERE population > (SELECT population FROM world 
    WHERE name="Russia");'),
    (21, 'average', 'Which country has a population that is more than Canada but less than 
    Poland? Show the name and the population', 'SELECT name, population FROM world WHERE 
    population > (SELECT population FROM world WHERE name="Canada") AND population < (SELECT 
    population FROM world WHERE name="Poland");'),
    (22, 'hard', 'Show the name and the capital where the first letters of each match. Do not 
    include countries where the name and the capital are the same word. For example, the capital 
    of Sweden is Stockholm.', 'SELECT name, capital FROM world 
    WHERE LEFT(name, 1) = LEFT(capital, 1) AND name != capital;'),
    (23, 'hard', 'Find the country that has all the vowels and no spaces in its name.', 'SELECT 
    name FROM world WHERE name LIKE "%a%" AND name LIKE "%e%" AND name LIKE "%i%" AND 
    name LIKE "%o%" AND name LIKE "%u%" AND name NOT LIKE "% %";'),
    (24, 'easy', 'What is the total population of Estonia, Latvia, Lithuania?', 
    'SELECT SUM(population) FROM world WHERE name IN ("Estonia","Latvia","Lithuania");'),
    (25, 'easy', 'What is the average population of Poland, Germany and Denmark?', 'SELECT 
    AVG(population) FROM world WHERE name IN ("Poland", "Germany", "Denmark");');

-- query for public.world
CREATE TABLE public.world (
	"_id" serial NOT NULL UNIQUE,
	"name" varchar NOT NULL,
	"capital" varchar NOT NULL,
	"population" integer NOT NULL,
	CONSTRAINT "world_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- fill database with all data
INSERT INTO public.world (_id, name, capital, population)
VALUES 
  (1, 'Afghanistan', 'Kabul', 40099462),
  (2, 'Albania', 'Tirana', 2811666),
  (3, 'Algeria', 'Algiers', 44177969),
  (4, 'American Samoa', 'Pago Pago', 45035),
  (5, 'Andorra', 'Andorra la Vella', 79034),
  (6, 'Angola', 'Luanda', 34503774),
  (7, 'Antigua and Barbuda', 'St. Johns', 93219),
  (8, 'Argentina', 'Buenos Aires', 45808747),
  (9, 'Armenia', 'Yerevan', 2790974),
  (10, 'Aruba', 'Oranjestad', 106537),
  (11, 'Australia', 'Canberra', 25688079),
  (12, 'Austria', 'Vienna', 8955797),
  (13, 'Azerbaijan', 'Baku', 10137750),
  (14, 'Bahamas', 'Nassau', 407906),
  (15, 'Bahrain', 'Manama', 1463265),
  (16, 'Bangladesh', 'Dhaka', 169356251),
  (17, 'Barbados', 'Bridgetown', 281200),
  (18, 'Belarus', 'Minsk', 9340314),
  (19, 'Belgium', 'Brussels', 11592952),
  (20, 'Belize', 'Belmopan', 400031),
  (21, 'Benin', 'Porto-Novo', 12996895),
  (22, 'Bermuda', 'Hamilton', 63867),
  (23, 'Bhutan', 'Thimphu', 777486),
  (24, 'Bolivia', 'Sucre', 12079472),
  (25, 'Bolivia', 'La Paz', 12079472),
  (26, 'Bosnia and Herzegovina', 'Sarajevo', 3270943),
  (27, 'Botswana', 'Gaborone', 2588423),
  (28, 'Brazil', 'Brasília', 214326223),
  (29, 'British Virgin Islands', 'Road Town', 31122),
  (30, 'Brunei', 'Bandar Seri Begawan', 445373),
  (31, 'Bulgaria', 'Sofia', 6877743),
  (32, 'Burkina Faso', 'Ouagadougou', 22100683),
  (33, 'Burundi', 'Bujumbura', 12551213),
  (34, 'Cambodia', 'Phnom Penh', 16589023),
  (35, 'Cameroon', 'Yaoundé', 27198628),
  (36, 'Canada', 'Ottawa', 38246108),
  (37, 'Cape Verde', 'Praia', 587925),
  (38, 'Cayman Islands', 'George Town', 68136),
  (39, 'Central African Republic', 'Bangui', 5457154),
  (40, 'Chad', 'NDjamena', 17179740),
  (41, 'Chile', 'Santiago', 19493184),
  (42, 'China', 'Beijing', 1412360000),
  (43, 'Colombia', 'Bogotá', 51516562),
  (44, 'Comoros', 'Moroni', 821625),
  (45, 'Costa Rica', 'San José', 5153957),
  (46, 'Croatia', 'Zagreb', 3899000),
  (47, 'Cuba', 'Havana', 11256372),
  (48, 'Curaçao', 'Willemstad', 152369),
  (49, 'Cyprus', 'Nicosia', 1244188),
  (50, 'Czech Republic', 'Prague', 10505772),
  (51, 'Côte d Ivoire', 'Yamoussoukro', 27478249),
  (52, 'Democratic Republic of the Congo', 'Kinshasa', 95894118),
  (53, 'Denmark', 'Copenhagen', 5856733),
  (54, 'Djibouti', 'Djibouti', 1105557),
  (55, 'Dominica', 'Roseau', 72412),
  (56, 'Dominican Republic', 'Santo Domingo', 11117873),
  (57, 'East Timor (Timor-Leste)', 'Dili', 1320942),
  (58, 'Ecuador', 'Quito', 17797737),
  (59, 'Egypt', 'Cairo', 109262178),
  (60, 'El Salvador', 'San Salvador', 6314167),
  (61, 'Equatorial Guinea', 'Malabo', 1634466), 
  (62, 'Eritrea', 'Asmara', 3620312),
  (63, 'Estonia', 'Tallinn', 1330932),
  (64, 'Ethiopia', 'Addis Ababa', 120283026),
  (65, 'Faroe Islands', 'Tórshavn', 52889),
  (66, 'Federated States of Micronesia', 'Palikir', 113131),
  (67, 'Fiji', 'Suva', 924610),
  (68, 'Finland', 'Helsinki', 5541017), 
  (69, 'France', 'Paris', 67749632), 
  (70, 'French Polynesia', 'Papeete', 304032), 
  (71, 'Gabon', 'Libreville', 2341179), 
  (72, 'Gambia', 'Banjul', 2639916), 
  (73, 'Georgia', 'Tbilisi', 3708610), 
  (74, 'Germany', 'Berlin', 83196078), 
  (75, 'Ghana', 'Accra', 32833031), 
  (76, 'Gibraltar', 'Gibraltar', 32669), 
  (77, 'Greece', 'Athens', 10641221), 
  (78, 'Greenland', 'Nuuk', 56653), 
  (79, 'Grenada', 'St. Georges', 124610), 
  (80, 'Guam', 'Hagatna', 170534), 
  (81, 'Guatemala', 'Guatemala City', 17109746), 
  (82, 'Guinea', 'Conakry', 13531906), 
  (83, 'Guinea-Bissau', 'Bissau', 2060721), 
  (84, 'Guyana', 'Georgetown', 804567), 
  (85, 'Haiti', 'Port-au-Prince', 11447569), 
  (86, 'Honduras', 'Tegucigalpa', 10278345), 
  (87, 'Hungary', 'Budapest', 9709891), 
  (88, 'Iceland', 'Reykjavík', 372520), 
  (89, 'India', 'New Delhi', 1407563842), 
  (90, 'Indonesia', 'Jakarta', 273753191), 
  (91, 'Iran', 'Tehran', 87923432), 
  (92, 'Iraq', 'Baghdad', 43533592), 
  (93, 'Ireland', 'Dublin', 5033165), 
  (94, 'Isle of Man', 'Douglas', 84263), 
  (95, 'Israel', 'Jerusalem', 9364000), 
  (96, 'Italy', 'Rome', 59109668), 
  (97, 'Jamaica', 'Kingston', 2827695), 
  (98, 'Japan', 'Tokyo', 125681593), 
  (99, 'Jordan', 'Amman', 11148278), 
  (100, 'Kazakhstan', 'Astana', 19000988), 
  (102, 'Kenya', 'Nairobi', 53005614), 
  (103, 'Kiribati', 'Tarawa', 128874), 
  (104, 'Kosovo', 'Pristina', 1786038), 
  (105, 'Kuwait', 'Kuwait City', 4250114), 
  (106, 'Kyrgyzstan', 'Bishkek', 6691800), 
  (107, 'Laos', 'Vientiane', 7425057), 
  (108, 'Latvia', 'Riga', 1884490), 
  (109, 'Lebanon', 'Beirut', 5592631), 
  (110, 'Lesotho', 'Maseru', 2281454), 
  (111, 'Liberia', 'Monrovia', 5193416), 
  (112, 'Libya', 'Tripoli', 6735277), 
  (113, 'Liechtenstein', 'Vaduz', 39039), 
  (114, 'Lithuania', 'Vilnius', 2800839), 
  (115, 'Luxembourg', 'Luxembourg', 640064), 
  (116, 'Macedonia', 'Skopje', 2065092), 
  (117, 'Madagascar', 'Antananarivo', 28915653), 
  (118, 'Malawi', 'Lilongwe', 19889742), 
  (119, 'Malaysia', 'Kuala Lumpur', 33573874), 
  (120, 'Maldives', 'Malé', 521457), 
  (121, 'Mali', 'Bamako', 21904983), 
  (122, 'Malta', 'Valletta', 518536), 
  (123, 'Marshall Islands', 'Majuro', 42050), 
  (124, 'Mauritania', 'Nouakchott', 4614974), 
  (125, 'Mauritius', 'Port Louis', 1266060), 
  (126, 'Mexico', 'Mexico City', 126705138), 
  (127, 'Moldova', 'Chisinau', 2615199), 
  (128, 'Monaco', 'Monaco', 36686), 
  (129, 'Mongolia', 'Ulaanbaatar', 3347782), 
  (130, 'Montenegro', 'Podgorica', 619211), 
  (131, 'Morocco', 'Rabat', 37076584), 
  (132, 'Mozambique', 'Maputo', 32077072), 
  (133, 'Myanmar', 'Naypyidaw', 53798084), 
  (134, 'Namibia', 'Windhoek', 2530151), 
  (135, 'Nauru', 'Yaren', 12511), 
  (136, 'Nepal', 'Kathmandu', 30034989), 
  (137, 'Netherlands', 'Amsterdam', 17533044), 
  (138, 'New Caledonia', 'Nouméa', 271030),
  (139, 'New Zealand', 'Wellington', 5122600),
  (140, 'Nicaragua', 'Managua', 6850540), 
  (141, 'Niger', 'Niamey', 25252722), 
  (142, 'Nigeria', 'Abuja', 213401323), 
  (143, 'North Korea', 'Pyongyang', 25971909), 
  (144, 'Ireland', 'Belfast', 5033165), 
  (145, 'Northern Mariana Islands', 'Saipan', 49481), 
  (146, 'Norway', 'Oslo', 5408320), 
  (147, 'Oman', 'Muscat', 4520471), 
  (148, 'Pakistan', 'Islamabad', 231402117), 
  (149, 'Palau', 'Ngerulmud', 18024), 
  (150, 'Panama', 'Panama City', 4351267), 
  (151, 'Papua New Guinea', 'Port Moresby', 9949437), 
  (152, 'Paraguay', 'Asunción', 6703799), 
  (153, 'Peru', 'Lima', 33715471), 
  (154, 'Philippines', 'Manila', 113880328), 
  (155, 'Poland', 'Warsaw', 37747124), 
  (156, 'Portugal', 'Lisbon', 10325147), 
  (157, 'Puerto Rico', 'San Juan', 3263584), 
  (158, 'Qatar', 'Doha', 2688235), 
  (159, 'Republic of the Congo', 'Brazzaville', 5835806), 
  (160, 'Romania', 'Bucharest', 19119880), 
  (161, 'Russia', 'Moscow', 143449286), 
  (162, 'Rwanda', 'Kigali', 13461888), 
  (163, 'Samoa', 'Apia', 218764), 
  (164, 'San Marino', 'San Marino', 33745), 
  (165, 'Saudi Arabia', 'Riyadh', 35950396), 
  (166, 'Senegal', 'Dakar', 16876720), 
  (167, 'Serbia', 'Belgrade', 6834326), 
  (168, 'Seychelles', 'Victoria', 99258), 
  (169, 'Sierra Leone', 'Freetown', 8420641), 
  (170, 'Singapore', 'Singapore', 5453566), 
  (171, 'Sint Maarten', 'Philipsburg', 42846), 
  (172, 'Slovenia', 'Ljubljana', 2108079), 
  (173, 'Solomon Islands', 'Honiara', 707851), 
  (174, 'Somalia', 'Mogadishu', 17065581), 
  (175, 'South Africa', 'Pretoria', 59392255), 
  (176, 'South Korea', 'Seoul', 51744876), 
  (177, 'South Sudan', 'Juba', 10748272), 
  (178, 'Spain', 'Madrid', 47415750), 
  (179, 'Sri Lanka', 'Sri Jayawardenapura Kotte', 22156000), 
  (180, 'Sudan', 'Khartoum', 45657202), 
  (181, 'Suriname', 'Paramaribo', 612985), 
  (182, 'Sweden', 'Stockholm', 10415811), 
  (183, 'Switzerland', 'Bern', 8703405), 
  (184, 'Syria', 'Damascus', 21324367), 
  (185, 'São Tomé and Príncipe', 'São Tomé', 223107), 
  (186, 'Tajikistan', 'Dushanbe', 9750064), 
  (187, 'Tanzania', 'Dodoma', 63588334), 
  (188, 'Thailand', 'Bangkok', 71601103), 
  (189, 'Togo', 'Lomé', 8644829), 
  (190, 'Tonga', 'Nukualofa', 106017), 
  (191, 'Trinidad and Tobago', 'Port of Spain', 1525663), 
  (192, 'Tunisia', 'Tunis', 12262946), 
  (193, 'Turkey', 'Ankara', 84775404), 
  (194, 'Turkmenistan', 'Ashgabat', 6341855), 
  (195, 'Turks and Caicos Islands', 'Cockburn Town', 45114), 
  (196, 'Tuvalu', 'Funafuti', 11204), 
  (197, 'Uganda', 'Kampala', 45853778), 
  (198, 'Ukraine', 'Kyiv', 43792855), 
  (199, 'United Arab Emirates', 'Abu Dhabi', 9365145), 
  (200, 'England', 'London', 67326569), 
  (201, 'United States', 'Washington, D.C.', 331893745), 
  (202, 'United States Virgin Islands', 'Charlotte Amalie', 105870), 
  (203, 'Uruguay', 'Montevideo', 3426260), 
  (204, 'Uzbekistan', 'Tashkent', 34915100), 
  (205, 'Vanuatu', 'Port Vila', 319137), 
  (206, 'Venezuela', 'Caracas', 28199867), 
  (207, 'Vietnam', 'Hanoi', 97468029), 
  (208, 'Yemen', 'Sanaá', 32981641), 
  (209, 'Zambia', 'Lusaka', 19473125), 
  (210, 'Zimbabwe', 'Harare', 15993524);

-- to add the foreign keys at the end of the table creation
-- add foreign key to users_itineraries called "users_itineraries_fk"
-- ALTER TABLE public.users_itineraries ADD CONSTRAINT "users_itineraries_fk0" FOREIGN KEY ("user_id") REFERENCES  public.user("_id");