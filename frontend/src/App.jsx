import RiderPanel from "./components/RiderPanel";
import CustomerPanel from "./components/CustomerPanel";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h1>Mini Order Status Tracker</h1>
      <div className="panels">
        <RiderPanel />
        <CustomerPanel />
      </div>
    </div>
  );
}