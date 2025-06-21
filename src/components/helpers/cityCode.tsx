let cityCode = {
  "Mumbai Central": "MH01",
  "Mumbai West (Andheri)": "MH02",
  "Mumbai East (Wadala/Ghatkopar)": "MH03",
  "Thane": "MH04",
  "Kalyan": "MH05",
  "Raigad (Pen)": "MH06",
  "Sindhudurg (Kudal)": "MH07",
  "Ratnagiri": "MH08",
  "Kolhapur": "MH09",
  "Sangli": "MH10",
  "Satara": "MH11",
  "Pune": "MH12",
  "Solapur": "MH13",
  "Pimpri‑Chinchwad": "MH14",
  "Nashik": "MH15",
  "Ahmednagar": "MH16",
  "Shrirampur": "MH17",
  "Dhule": "MH18",
  "Jalgaon": "MH19",
  "Aurangabad": "MH20",
  "Jalna": "MH21",
  "Parbhani": "MH22",
  "Beed": "MH23",
  "Latur": "MH24",
  "Osmanabad": "MH25",
  "Nanded": "MH26",
  "Amravati": "MH27",
  "Buldhana": "MH28",
  "Yavatmal": "MH29",
  "Akola": "MH30",
  "Nagpur (Central)": "MH31",
  "Wardha": "MH32",
  "Gadchiroli": "MH33",
  "Chandrapur": "MH34",
  "Gondia": "MH35",
  "Bhandara": "MH36",
  "Washim": "MH37",
  "Hingoli": "MH38",
  "Nandurbar": "MH39",
  "Nagpur Rural (Wadi)": "MH40",
  "Malegaon": "MH41",
  "Baramati": "MH42",
  "Vashi (Navi Mumbai)": "MH43",
  "Ambejogai": "MH44",
  "Akluj": "MH45",
  "Panvel": "MH46",
  "Borivali": "MH47",
  "Vasai": "MH48",
  "Nagpur East": "MH49",
  "Karad": "MH50",
  "Sangamner": "MH51",
  "Parbhani Rural": "MH52",
  "Pune South": "MH53",
  "Pune North": "MH54",
  "Mumbai Central Expansion": "MH55",
  "Thane Rural": "MH56",
  "Vashi Deputy": "MH43",
  "TC Office (Special)": "MH99"
};

export default function getCityCode(cityName) {
  //Use regex to match the closest city name
    const regex = new RegExp(`^${cityName}`, 'i');
    const matchedCity = Object.keys(cityCode).find(city => regex.test(city));
    if (matchedCity) {
        return cityCode[matchedCity];
    }
    // If no match found, return a default message
    // or handle it as needed
    // For example, you could return an error message or a default code
    return "City code not found";
}