setInterval(() => {
    const element = document.querySelector("#bmiGauge > svg:nth-child(2)");
    if (element) {
        element.remove();
    }
}, 100); // Kiểm tra mỗi giây


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const resultsSection = document.getElementById('results');
    let gauge;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });

    function calculateBMI() {
        const height = document.getElementById('height').value / 100;
        const weight = document.getElementById('weight').value;
        const bmi = weight / (height * height);
        displayResults(bmi);
    }

    function displayResults(bmi) {
        const bmiResult = document.getElementById('bmi-result');
        const calorieAdvice = document.getElementById('calorie-advice');
        const lifestyleAdvice = document.getElementById('lifestyle-advice');
        const dietRecommendations = document.getElementById('diet-recommendations');
        const workoutPlan = document.getElementById('workout-plan');

        bmiResult.textContent = `Your BMI is ${bmi.toFixed(1)}`;
        
        let advice = getAdvice(bmi);

        calorieAdvice.textContent = advice.calorie;
        lifestyleAdvice.textContent = advice.lifestyle;
        dietRecommendations.innerHTML = `
            <h3>Dietary Recommendations:</h3>
            <ul>
                ${advice.diet.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        workoutPlan.innerHTML = `
            <h3>Workout Recommendations:</h3>
            <ul>
                ${advice.workout.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;

        if (gauge) {
            document.getElementById('bmiGauge').innerHTML = '';
        }

        gauge = new JustGage({
            id: "bmiGauge",
            value: bmi,
            min: 10,
            max: 40,
            title: "BMI",
            label: "kg/m²",
            levelColors: ["#FF6384", "#36A2EB", "#FFCE56"],
            customSectors: [{
                color: "#FF6384",
                lo: 10,
                hi: 18.5
            }, {
                color: "#36A2EB",
                lo: 18.5,
                hi: 25
            }, {
                color: "#FFCE56",
                lo: 25,
                hi: 40
            }]
        });

        resultsSection.style.display = 'block';
    }

    function getAdvice(bmi) {
        if (bmi < 18.5) {
            return {
                calorie: "You may need to increase your calorie intake.",
                lifestyle: "Focus on nutrient-dense foods and strength training exercises.",
                diet: [
                    "Increase your calorie intake by 300-500 calories per day",
                    "Eat more protein-rich foods like lean meats, fish, eggs, and dairy",
                    "Include healthy fats in your diet, such as avocados, nuts, and olive oil",
                    "Consume complex carbohydrates like whole grains, sweet potatoes, and quinoa",
                    "Have frequent, smaller meals throughout the day"
                ],
                workout: [
                    "Focus on strength training exercises to build muscle mass",
                    "Incorporate compound exercises like squats, deadlifts, and bench presses",
                    "Limit cardio to 2-3 sessions per week, 20-30 minutes each",
                    "Ensure adequate rest between workouts for muscle recovery and growth"
                ]
            };
        } else if (bmi >= 18.5 && bmi < 25) {
            return {
                calorie: "Your calorie intake seems appropriate for your height and weight.",
                lifestyle: "Maintain a balanced diet and regular exercise routine.",
                diet: [
                    "Maintain your current calorie intake",
                    "Eat a balanced diet with a variety of fruits, vegetables, whole grains, and lean proteins",
                    "Stay hydrated by drinking plenty of water throughout the day",
                    "Limit processed foods and sugary drinks",
                    "Practice portion control to maintain your healthy weight"
                ],
                workout: [
                    "Aim for at least 150 minutes of moderate-intensity aerobic activity per week",
                    "Include strength training exercises 2-3 times per week",
                    "Try a mix of activities like walking, jogging, cycling, or swimming",
                    "Consider adding flexibility exercises or yoga to your routine"
                ]
            };
        } else {
            return {
                calorie: "You may benefit from reducing your calorie intake.",
                lifestyle: "Focus on a balanced diet, portion control, and regular exercise.",
                diet: [
                    "Create a calorie deficit by reducing your daily intake by 500-750 calories",
                    "Increase your consumption of vegetables and fruits",
                    "Choose lean proteins like chicken, fish, tofu, and legumes",
                    "Opt for whole grains instead of refined carbohydrates",
                    "Avoid sugary drinks and opt for water or unsweetened beverages"
                ],
                workout: [
                    "Aim for at least 150-300 minutes of moderate-intensity aerobic activity per week",
                    "Incorporate strength training exercises 2-3 times per week",
                    "Consider high-intensity interval training (HIIT) for efficient calorie burning",
                    "Include activities that you enjoy to make exercise more sustainable",
                    "Gradually increase the duration and intensity of your workouts"
                ]
            };
        }
    }
});
