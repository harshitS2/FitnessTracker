import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FitnessTracker = () => {
  const [weightGoal, setWeightGoal] = useState(70);
  const [currentWeight, setCurrentWeight] = useState(75);
  const [foodEntries, setFoodEntries] = useState([]);
  const [exerciseEntries, setExerciseEntries] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', calories: 0, protein: 0 });
  const [newExercise, setNewExercise] = useState({ name: '', duration: 0, caloriesBurned: 0 });

  useEffect(() => {
    const storedData = localStorage.getItem('fitnessData');
    if (storedData) {
      const { food, exercise, weight, goal, current } = JSON.parse(storedData);
      setFoodEntries(food);
      setExerciseEntries(exercise);
      setWeightHistory(weight);
      setWeightGoal(goal);
      setCurrentWeight(current);
    }
  }, []);

  useEffect(() => {
    const data = {
      food: foodEntries,
      exercise: exerciseEntries,
      weight: weightHistory,
      goal: weightGoal,
      current: currentWeight,
    };
    localStorage.setItem('fitnessData', JSON.stringify(data));
  }, [foodEntries, exerciseEntries, weightHistory, weightGoal, currentWeight]);

  const addFoodEntry = () => {
    if (newFood.name && newFood.calories > 0) {
      const entry = {
        id: Date.now().toString(),
        ...newFood,
        timestamp: new Date().toISOString(),
      };
      setFoodEntries([...foodEntries, entry]);
      setNewFood({ name: '', calories: 0, protein: 0 });
    }
  };

  const addExerciseEntry = () => {
    if (newExercise.name && newExercise.duration > 0) {
      const entry = {
        id: Date.now().toString(),
        ...newExercise,
        timestamp: new Date().toISOString(),
      };
      setExerciseEntries([...exerciseEntries, entry]);
      setNewExercise({ name: '', duration: 0, caloriesBurned: 0 });
    }
  };

  const updateWeight = () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      weight: currentWeight,
    };
    setWeightHistory([...weightHistory, entry]);
  };

  const totalCaloriesConsumed = foodEntries
    .filter(entry => entry.timestamp.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, entry) => sum + entry.calories, 0);

  const totalCaloriesBurned = exerciseEntries
    .filter(entry => entry.timestamp.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, entry) => sum + entry.caloriesBurned, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Fitness & Nutrition Tracker</h1>
        
        {/* Weight Goals Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Weight Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Current Weight (kg)</label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={updateWeight}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Weight
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Weight Goal (kg)</label>
              <input
                type="number"
                value={weightGoal}
                onChange={(e) => setWeightGoal(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Weight Progress</h2>
          <div className="w-full h-64">
            <LineChart width={800} height={240} data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#3B82F6" />
            </LineChart>
          </div>
        </div>

        {/* Food Tracking Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Food Diary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Food name"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Calories"
              value={newFood.calories || ''}
              onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })}
              className="p-2 border rounded"
            />
            <button
              onClick={addFoodEntry}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Food
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {foodEntries.map(entry => (
              <div key={entry.id} className="flex justify-between items-center p-2 border-b">
                <span>{entry.name}</span>
                <span>{entry.calories} calories</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Tracking Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Exercise Log</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Exercise name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={newExercise.duration || ''}
              onChange={(e) => setNewExercise({ ...newExercise, duration: Number(e.target.value) })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Calories burned"
              value={newExercise.caloriesBurned || ''}
              onChange={(e) => setNewExercise({ ...newExercise, caloriesBurned: Number(e.target.value) })}
              className="p-2 border rounded"
            />
            <button
              onClick={addExerciseEntry}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Add Exercise
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {exerciseEntries.map(entry => (
              <div key={entry.id} className="flex justify-between items-center p-2 border-b">
                <span>{entry.name} ({entry.duration} mins)</span>
                <span>{entry.caloriesBurned} calories</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="text-lg font-medium">Calories Consumed</p>
              <p className="text-2xl font-bold text-blue-600">{totalCaloriesConsumed}</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <p className="text-lg font-medium">Calories Burned</p>
              <p className="text-2xl font-bold text-green-600">{totalCaloriesBurned}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;