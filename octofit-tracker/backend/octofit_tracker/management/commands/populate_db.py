from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Teams
        teams = [
            {"name": "Marvel", "description": "Marvel Superheroes"},
            {"name": "DC", "description": "DC Superheroes"}
        ]
        db.teams.insert_many(teams)

        # Users
        users = [
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"}
        ]
        db.users.insert_many(users)
        db.users.create_index([("email", 1)], unique=True)

        # Activities
        activities = [
            {"user": "spiderman@marvel.com", "type": "run", "distance": 5, "duration": 30},
            {"user": "ironman@marvel.com", "type": "cycle", "distance": 20, "duration": 60},
            {"user": "wonderwoman@dc.com", "type": "swim", "distance": 2, "duration": 40},
            {"user": "batman@dc.com", "type": "walk", "distance": 3, "duration": 50}
        ]
        db.activities.insert_many(activities)

        # Workouts
        workouts = [
            {"user": "spiderman@marvel.com", "workout": "HIIT", "duration": 20},
            {"user": "ironman@marvel.com", "workout": "Strength", "duration": 45},
            {"user": "wonderwoman@dc.com", "workout": "Yoga", "duration": 30},
            {"user": "batman@dc.com", "workout": "Cardio", "duration": 35}
        ]
        db.workouts.insert_many(workouts)

        # Leaderboard
        leaderboard = [
            {"user": "spiderman@marvel.com", "points": 100},
            {"user": "ironman@marvel.com", "points": 90},
            {"user": "wonderwoman@dc.com", "points": 110},
            {"user": "batman@dc.com", "points": 95}
        ]
        db.leaderboard.insert_many(leaderboard)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
