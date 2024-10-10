from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Sample correct answers for validation
correct_answers = {
    0: "Paris",
    1: "4",
    2: "Harper Lee",
    3: "Jupiter",
    4: "100°C",
    5: "Oxygen",
    6: "Yen",
    7: "Leonardo da Vinci",
    8: "Ottawa",
    9: "H2O"
}

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    user_answers = request.json.get('answers')
    review_data = []
    for index, answer in enumerate(user_answers):
        correct_answer = correct_answers.get(index)
        is_correct = (answer == correct_answer)
        explanation = "Explanation here"  # Add explanation logic if needed
        review_data.append({
            "question": questions[index]['question'],
            "userAnswer": answer,
            "correctAnswer": correct_answer,
            "isCorrect": is_correct,
            "explanation": explanation
        })
    return jsonify({"review": review_data})

if __name__ == '__main__':
    app.run(debug=True)
