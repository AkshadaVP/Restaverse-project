from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuring the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reviews.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Defining the Review model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String(100), nullable=False)
    profile_picture = db.Column(db.String(200))
    rating = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    reply = db.Column(db.Text)
    reply_date = db.Column(db.DateTime)

# Route to get paginated reviews
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    reviews = Review.query.order_by(Review.date.desc()).paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'reviews': [{
            'id': review.id,
            'author_name': review.author_name,
            'profile_picture': review.profile_picture,
            'rating': review.rating,
            'text': review.text,
            'date': review.date.isoformat(),
            'reply': review.reply,
            'reply_date': review.reply_date.isoformat() if review.reply_date else None
        } for review in reviews.items],
        'total_pages': reviews.pages,
        'current_page': page
    })

# Route to reply to a specific review
@app.route('/api/reviews/<int:review_id>/reply', methods=['POST'])
def reply_to_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.json
    
    if 'reply' not in data:
        return jsonify({'error': 'Reply text is required'}), 400
    
    review.reply = data['reply']
    review.reply_date = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'id': review.id,
        'author_name': review.author_name,
        'profile_picture': review.profile_picture,
        'rating': review.rating,
        'text': review.text,
        'date': review.date.isoformat(),
        'reply': review.reply,
        'reply_date': review.reply_date.isoformat()
    })

# Function to seed the database with mock data from a JSON file
def seed_database():
    if Review.query.count() == 0:  # Only seed if the database is empty
        with open('mock_reviews.json') as file:
            mock_data = json.load(file)

        for review_data in mock_data:
            review = Review(
                author_name=review_data['author_name'],
                profile_picture=review_data['profile_picture'],
                rating=review_data['rating'],
                text=review_data['text'],
                date=datetime.strptime(review_data['date'], '%Y-%m-%dT%H:%M:%SZ')  # Convert string to datetime
            )
            db.session.add(review)

        db.session.commit()
        print("Database has been seeded with mock data.")
    else:
        print("Database already seeded. No new data added.")

# Main block to create tables and seed data
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure the database and tables are created
        seed_database()  # Seed the database with mock data
    app.run(debug=True)
