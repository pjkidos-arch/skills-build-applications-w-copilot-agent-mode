from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team", description="A test team")
        self.assertEqual(team.name, "Test Team")

    def test_create_user(self):
        user = User.objects.create(name="Test User", email="test@example.com", team="Test Team")
        self.assertEqual(user.email, "test@example.com")

    def test_create_activity(self):
        activity = Activity.objects.create(user="test@example.com", type="run", distance=5, duration=30)
        self.assertEqual(activity.type, "run")

    def test_create_workout(self):
        workout = Workout.objects.create(user="test@example.com", workout="HIIT", duration=20)
        self.assertEqual(workout.workout, "HIIT")

    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(user="test@example.com", points=100)
        self.assertEqual(lb.points, 100)
