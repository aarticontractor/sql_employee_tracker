INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Marketing'),
       (3, 'Engineering'),
       (4, 'Finance'),
       (5, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Representative', 50000, 1),
       (2, 'Sales Manager', 80000, 1),
       (3, 'Marketing Coordinator', 45000, 2),
       (4, 'Marketing Manager', 75000, 2),
       (5, 'Software Engineer', 100000, 3),
       (6, 'Senior Software Engineer', 120000, 3),
       (7, 'Account Manager', 40000, 4),
       (8, 'Accountant', 30000, 4),
       (9, 'Legal Team Lead', 120000, 5),
       (10, 'Lawyer', 130000, 5);


INSERT INTO employee (id, first_name, last_name, role_id, manager)
VALUES (2, 'Jane', 'Doe', 2, NULL),
       (3, 'Bob', 'Smith', 3, 'John Doe'),
       (4, 'Alice', 'Johnson', 4, NULL),
       (5, 'David', 'Lee', 5, NULL),
       (6, 'Karen', 'Wang', 6, NULL),
       (7, 'Emily', 'Kim', 7, 'Sarah Park'),
       (8, 'Jessica', 'Li', 8, 'Sarah Park'),
       (9, 'Mike', 'Chen', 9, NULL),
       (10, 'Sarah', 'Park', 10, 'Lucy Wu'),
       (11, 'Jason', 'Gupta', 6, 'John Doe'),
       (12, 'Rachel', 'Singh', 6, 'Lucy Wu'),
       (13, 'Kevin', 'Nguyen', 5, 'Alex Gonzalez'),
       (14, 'Lucy', 'Wu', 5, 'Alex Gonzalez'),
       (15, 'Alex', 'Gonzalez', 3, NULL),
       (16, 'Avery', 'Ramirez', 3, 'Alex Gonzalez'),
       (17, 'Jordan', 'Perez', 4, NULL),
       (18, 'Taylor', 'Rodriguez', 4, NULL),
       (19, 'Logan', 'Martinez', 2, NULL),
       (20, 'Hayden', 'Hernandez', 2, NULL);