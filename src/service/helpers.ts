
export const selectImageByCode = (code:number): [string, string] => {
    switch (true){
        case code === 0:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096994/weather_icons/reshot-icon-sun-Q85CP4JVTX_liyhec.svg', 'Sunny'];
        case code >=1 && code <= 2:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685192011/weather_icons/reshot-icon-sun-cloud-2953AVYT8B_bcuq3g.svg', 'Cloudy'];
        case code === 3:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096994/weather_icons/reshot-icon-cloudy-Z3RM5KHT8E_k6vxtt.svg', 'Overcast'];
        case code >= 45 && code <= 48:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685192011/weather_icons/reshot-icon-fog-AS6L9JKDH4_uu9469.svg', "Fog"];
        case code >=51 && code <= 55:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685192011/weather_icons/reshot-icon-rain-drops-CGLK8SHXM5_ttlsmd.svg', 'Drizzle'];
        case code >=56 && code <=57:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685097102/weather_icons/reshot-icon-snow-rain-JRT8GHYWX4_xpouu3.svg', 'Freezing drizzle'];
        case code >= 61 && code <=65:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096835/weather_icons/reshot-icon-rain-548NGEBKCJ_vvjdwj.svg', 'Rain'];
        case code >=66 && code <=67: 
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685192011/weather_icons/reshot-icon-rain-drops-CGLK8SHXM5_ttlsmd.svg', 'Freezing rain'];
        case code >=71 && code <= 77:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096994/weather_icons/reshot-icon-snow-cloud-2LYS7RHMCG_qnnytf.svg', 'Snow fall'];
        case code >= 80 && code <=82:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096835/weather_icons/reshot-icon-rain-548NGEBKCJ_vvjdwj.svg', 'Rain showers'];
        case code >=85 && code <=86:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685192521/weather_icons/reshot-icon-snow-cloud-HZM8LR5G3Y_tonihu.svg', 'Snow showers'];
        case code >=95 && code <= 99:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096994/weather_icons/reshot-icon-storm-cloud-AMSTXBLQU5_gxojgg.svg', 'Thunderstorm'];
        default:
            return ['https://res.cloudinary.com/dphnruwkk/image/upload/v1685096994/weather_icons/reshot-icon-sun-Q85CP4JVTX_liyhec.svg', "Sunny"]
        }
}