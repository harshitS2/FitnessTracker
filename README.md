# Fitness & Nutrition Tracker

A comprehensive web application for tracking fitness goals, nutrition intake, and exercise activities. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 Weight tracking with visual progress charts
- 🍎 Food diary with calorie tracking
- 💪 Exercise logging system
- 📈 Daily calorie summary
- 💾 Persistent data storage using localStorage
- 📱 Responsive design for all devices

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-tracker
```

2. Install dependencies:
```bash
npm install
npm install recharts
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Weight Tracking
- Enter your current weight and weight goal
- Track your progress with the interactive chart
- Update weight regularly to see progress over time

### Food Diary
- Add food entries with name and calorie information
- View your daily food log
- Track total calories consumed

### Exercise Log
- Record exercises with duration and calories burned
- Monitor your daily physical activity
- Track total calories burned

### Daily Summary
- View total calories consumed vs burned
- Monitor your daily progress
- Make informed decisions about your fitness goals

## Technical Details

### Technologies Used
- Next.js 13+
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Local Storage API

### Data Persistence
The application uses browser's localStorage to persist:
- Weight history
- Food entries
- Exercise logs
- Weight goals
- Current weight

### Component Structure
- Main FitnessTracker component
- Modular sections for weight, food, and exercise tracking
- Interactive form inputs
- Data visualization components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For support, please open an issue in the repository or contact the maintainers.