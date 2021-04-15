from textwrap import dedent

from . import db

def initialize_db():

    # Journal Domains (e.g. Computer Science, Biology, ...)
    db.execute(dedent('''
        create table if not exists Domains (
            id integer primary key,
            name text
        );
    '''))

    db.execute(dedent('''
        create table if not exists Journals (
            id integer primary key,
            title text,
            url text,
            issn text
        );
    '''))

    # Many-To-Many connection from Journals to Domains
    db.execute(dedent('''
        create table if not exists JournalsToDomains (
            journal_id integer,
            domain_id integer,
            foreign key (journal_id) references Journals(id),
            foreign key (domain_id) references Domains(id)
        );
    '''))

    # Which policies each journal does have and enforces or not.
    db.execute(dedent('''
        create table if not exists Policies (
            id integer primary key,
            title text,
            first_year text,
            last_year text
        );
    '''))

    # PolicyTypes are meant to represent, for example:
    # - "Restriction" (for "Must be" policies, such as License restrictions)
    # - "Enforcement" (for "Would be good to be" policies, such as having unit tests)
    # - Some custom type, if needed.
    db.execute(dedent('''
        create table if not exists PolicyTypes (
            id integer primary key,
            name text
        );
    '''))

    db.execute(dedent('''
        create table if not exists JournalRatings (
            id integer primary key,
            rating text,
            date text
        );
    '''))

