export interface WeatherData {
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    sys: {
      country: string;
    };
  }
  
  export interface ForecastData {
    list: {
      dt: number;
      dt_txt: string;
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: {
        icon: string;
        description: string;
      }[];
    }[];
  }
  