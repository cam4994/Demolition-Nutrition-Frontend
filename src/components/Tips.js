import React from 'react';

const Tips = (props) => {
  return (
    <div className="tips">
      <h2 className="tips-title">Tips For {props.user.goal}</h2>
      {props.user.goal === "Weight Loss" ? (
        <ul>
            <li>Eat lots of Vegetables. Vegetables are packed with nutrients and they are not nutrient dense, allowing you to eat a lot without eating too many calories.</li>
            <li>Eat healthy fats. These include avocados, nut butters, nuts, fatty fish, cottage cheese, dark chocolate, whole eggs, chia seeds, olive oil, coconut oil, and yogurt, to name a few.</li>
            <li>Lift weights 3-4 times a week. While lifting weights isn't required to lose weight, it will aid in several ways. Lifting weights helps burn more calories and can prevent your metabolism from slowing down, which is a common side effect of losing weight.</li>
            <li>Try to minimize your sugar intake. In particular, avoid sugary drinks and fruit juices. These are very high in calories and not satiating.</li>
            <li>Drink lots of water! A good rule of thumb is to try and drink between 1 gallon and 1.5 gallons per day. Research shows that drinking lots of water may help suppress your appetite and boost your metabolism.</li>
            <li>Drink water immediately after waking up, before meals and prior to sleeping. Drinking water during these times have been shown to promote weight loss and a boost in metabolism.</li>
            <li>Besides water, coffee and tea are good beverage choices. Caffeine helps boost metabolism and can aid in fat burning.</li>
            <li>Get good, quality sleep. Poor sleep duration is known to be one of the biggest risk factors for weight gain. Poor sleep affects hormones that regulate appetite. If you don't get adequate sleep, you will likely be hungier and eat more calories.</li>
            <li>Eat spicy foods! Foods like chili peppers that contain capsaicin can also boost metabolism and reduce your appetite slightly.</li>
            <li>Make sure you are eating high amounts of protein. Protein is the most import nutrient for losing weight. It is the most satiating macronutrient and studies show that eating a high protein diet has been shown to boost metabolism by 80-100 calories per day.</li>
        </ul>
      ) : props.user.goal === "Maintenance" ? (
        <ul>
            <li>Eat lots of Vegetables. Vegetables are packed with nutrients and they are not nutrient dense, allowing you to eat a lot without eating too many calories.</li>
            <li>Try to minimize your sugar intake. In particular, avoid sugary drinks and fruit juices. These are very high in calories and not satiating.</li>
            <li>Eat healthy fats. These include avocados, nut butters, nuts, fatty fish, cottage cheese, dark chocolate, whole eggs, chia seeds, olive oil, coconut oil, and yogurt, to name a few.</li>
            <li>Stay active! Try to exercise 3-4 times a week, whether it is weight training or cardio.</li>
            <li>Drink lots of water! A good rule of thumb is to try and drink between 1 gallon and 1.5 gallons per day. Research shows that drinking lots of water may help suppress your appetite and boost your metabolism.</li>
            <li>Drink water immediately after waking up, before meals and prior to sleeping. Drinking water during these times have been shown to promote weight loss and a boost in metabolism.</li>
            <li>Get good, quality sleep. Poor sleep duration is known to be one of the biggest risk factors for weight gain. Poor sleep affects hormones that regulate appetite. If you don't get adequate sleep, you will likely be hungier and eat more calories.</li>
        </ul>
      ) : props.user.goal === "Weight Gain" ? (
        <ul>
            <li>Make sure you are in a calorie surplus of 250-1000 calories per day, depending on how quickly you are trying to grow and how much fat you are willing to gain. You cannot gain muscle without being in a calorie surplus.</li>
            <li>If possible, split your calories up and try to eat every 3 hours. If you do not eat often enough, you can limit the rate at which your body builds muscle.</li>
            <li>Eat a high protein diet. You should be eating at least 20g of protein with each meal and a good rule of thumb is to eat a 1g per pound of body-weight. So, if you weight 150 pounds, you should eat at least 150g of protein each day.</li>
            <li>If you are having trouble hitting your protein goals, try adding a supplement like whey protein. A fast digesting protein, it is often taken after working out and is an easy way to increase your protein intake.</li>
            <li>Do not try to eat a "Low-Carb Diet" while trying to build muscle mass and gain weight. You need sufficient carbohydrates to fuel your workouts and to maintain body stores of glucose.</li>
            <li>Mazimize your sleep. Muscle building, recovery and repair occur at rest and during sleep. Sleep and muscle-building are directly correlated.</li>
            <li>Prioritize weight training over cardio. While cardio can still be beneficial, it will also require you to eat more calories to hit your daily goals. Concentrating on weight training will aid you more in gaining muscle mass.</li>
            <li>Drink lots of water! A good rule of thumb is to try and drink between 1 gallon and 1.5 gallons per day. Preventing dehydration is crucial and by staying hydrated, your workouts will be more efficient and your body overall will function more efficiently.</li>
            <li>Try to minimize your sugar intake. In particular, avoid sugary drinks and fruit juices. These are very high in calories and not satiating.</li>
        </ul>
      ) : null }

    </div>
  )
}

export default Tips