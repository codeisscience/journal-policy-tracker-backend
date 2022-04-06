from os import name
from flask import jsonify, request, make_response
from flask.helpers import send_from_directory
from server import app, db
from server.models.Journal import Journal, Rating, Policies, Domain
from textwrap import dedent
from flask_cors import cross_origin


STUB_PAGE_MESSAGE = dedent(
    """
    Nothing here yet.<br>

    Wanna implement this API function? Submit a PR to <a
    href="https://github.com/codeisscience/codecompliance-backend">the Github
    repo</a>!
    """
)


@app.route("/", methods=["GET"])
@cross_origin()
def root():
    return dedent(
        """
        <h1> Welcome to Code Compliance Backend Server</h1>

        The APIs are as follows:
        <ul>
            <li><a href="/api/journals">Journal listing </a> at /api/journals (WIP)</li>
            <li><a href="/users/login">User Login </a> at /users/login (WIP)</li>
            <li><a href="/users/register">User Signup </a> at /users/register (WIP)</li>
        </ul>
    """
    )


@app.route("/api/journals", methods=["GET"])
@cross_origin()
def list_journals():
    journals = Journal.query.all()
    res = []

    for journal in journals:
        issn = journal.issn
        policy = Policies.query.filter_by(issn=issn)
        domain = Domain.query.filter_by(issn=issn).first()
        data = {
            "issn": issn,
            "title": journal.title,
            "url": journal.url,
            "rating": journal.ratings,
            "policy_title": policy[0].title,
            "first_year": policy[0].first_year,
            "last_year": policy[0].last_year,
            "policy_type": policy[0].policy_type,
            "domain": domain.name,
        }
        res.append(data)
    return jsonify(
        {
            "data": res,
            "message": "Journal details fetched successfully. The data field in the response will have the list of journals.",
        }
    )


@app.route("/api/journals", methods=["POST"])
@cross_origin()
def add_journals():
    body = request.json
    if body:
        issn = body["issn"]
        title = body["title"]
        url = body["url"]
        rating = body["rating"]
        journal = Journal(issn=issn, title=title, url=url, ratings=rating)

        policies = body["policies"]
        for policy in policies:
            policy_title = policy["title"]
            first_year = policy["first_year"]
            last_year = policy["last_year"]
            policy_type = policy["policy_type"]
            policy_to_add = Policies(
                issn=issn,
                title=policy_title,
                first_year=first_year,
                last_year=last_year,
                policy_type=policy_type,
            )
            db.session.add(policy_to_add)

        domain = body["domain"]
        journal_domain = Domain(issn=issn, name=domain)
        db.session.add(journal_domain)

        db.session.add(journal)
        db.session.commit()

    return jsonify({"message": "Journal added successfully!", "status": 200}, body)


@app.route("/api/journals/<issn>", methods=["GET"])
@cross_origin()
def get_journal_by_issn(issn):
    """Lists general information from a journal, including its domains"""
    journal = Journal.query.filter(Journal.issn == issn).one_or_none()
    res = []
    issn = journal.issn
    policy = Policies.query.filter_by(issn=issn)
    domain = Domain.query.filter_by(issn=issn).first()
    data = {
            "issn": issn,
            "title": journal.title,
            "url": journal.url,
            "rating": journal.ratings,
            "policy_title": policy[0].title,
            "first_year": policy[0].first_year,
            "last_year": policy[0].last_year,
            "policy_type": policy[0].policy_type,
            "domain": domain.name,
        }
    res.append(data)
    return jsonify({"message": "Journal found","status": 200, "data": res})
    

@app.route("/api/journals/<identifier>/policies", methods=["GET"])
@cross_origin()
def list_journal_policies():
    """Lists the policies from a journal."""
    return STUB_PAGE_MESSAGE

