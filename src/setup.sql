	-- CREATE ORGANIZATIONS TABLE

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

	-- INSERT ORGANIZATION INFO INTO TABLE

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

	-- CREATE PROJECTS TABLE

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations (organization_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

	-- CREATE SERVICE PROJECTS

INSERT INTO projects (organization_id, title, description, location, date)
VALUES
	-- BrightFuture Builders (organization_id = 1)
(
    1,
    'Community Playground Renovation',
    'Renovate an aging neighborhood playground using sustainable building materials and improved accessibility features.',
    'Riverside Community Park',
    '2026-08-15'
),
(
    1,
    'Senior Center Roof Replacement',
    'Replace the roof of the local senior center with energy-efficient and environmentally friendly materials.',
    'Oakridge Senior Center',
    '2026-09-05'
),
(
    1,
    'Affordable Housing Repair Day',
    'Volunteers repair and improve homes for low-income families through sustainable construction practices.',
    'Maple Heights',
    '2026-09-26'
),
(
    1,
    'Community Garden Pavilion Build',
    'Construct a covered pavilion to provide shelter and gathering space for community garden visitors.',
    'Eastside Community Garden',
    '2026-10-10'
),
(
    1,
    'School Accessibility Improvements',
    'Build wheelchair-accessible ramps and improve pathways at an elementary school.',
    'Lincoln Elementary School',
    '2026-11-07'
),

	-- GreenHarvest Growers (organization_id = 2)
(
    2,
    'Urban Garden Expansion',
    'Expand an existing urban garden to provide additional fresh produce for local families.',
    'Downtown Community Garden',
    '2026-08-22'
),
(
    2,
    'Composting Workshop',
    'Teach residents how to compost household waste to improve soil health and reduce landfill waste.',
    'Green Valley Community Center',
    '2026-09-12'
),
(
    2,
    'School Vegetable Garden Installation',
    'Install raised garden beds at a local elementary school and educate students about food sustainability.',
    'Jefferson Elementary School',
    '2026-09-30'
),
(
    2,
    'Neighborhood Tree Planting',
    'Plant fruit trees throughout the neighborhood to improve green spaces and food access.',
    'Westbrook Neighborhood',
    '2026-10-17'
),
(
    2,
    'Harvest Festival',
    'Host a community harvest celebration featuring locally grown produce, workshops, and family activities.',
    'City Farmers Market',
    '2026-11-14'
),

	-- UnityServe Volunteers (organization_id = 3)
(
    3,
    'Community Food Drive',
    'Coordinate volunteers to collect and distribute food donations to local food banks.',
    'Central Food Bank',
    '2026-08-29'
),
(
    3,
    'Neighborhood Cleanup Day',
    'Organize volunteers to remove litter and beautify public parks and streets.',
    'Riverside Park',
    '2026-09-19'
),
(
    3,
    'Holiday Gift Collection',
    'Collect and organize holiday gifts for families in need throughout the community.',
    'Community Outreach Center',
    '2026-11-28'
),
(
    3,
    'Senior Companion Program',
    'Match volunteers with senior citizens for weekly visits and companionship.',
    'Sunrise Retirement Village',
    '2026-10-03'
),
(
    3,
    'Charity Fun Run',
    'Coordinate volunteers for a community fun run raising funds for local nonprofit organizations.',
    'City Sports Complex',
    '2026-10-24'
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- CREATE CATEGORIES TABLE AND LINKING TABLE

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects (project_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories (category_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- INSERT CATEGORY DATA

INSERT INTO categories (name, description)
VALUES
(
    'Construction & Infrastructure',
    'Projects involving construction, renovation, accessibility improvements, and community infrastructure.'
),
(
    'Sustainability & Environment',
    'Projects promoting environmental stewardship, gardening, food sustainability, and green initiatives.'
),
(
    'Community Outreach',
    'Volunteer and charity projects that directly support local communities and individuals.'
),
(
    'Education',
    'Projects focused on teaching skills, raising awareness, or providing educational opportunities.'
),
(
    'Community Events',
    'Festivals, public events, and community gatherings that encourage engagement.'
);