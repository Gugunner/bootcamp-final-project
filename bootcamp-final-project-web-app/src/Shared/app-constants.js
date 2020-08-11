const acessToken = "pk.eyJ1IjoiZ3VndW5uZXIiLCJhIjoiY2tjbWxoamwzMDJmajJ4cWtsNHN6NjJkNiJ9.gTU76mp1kS4Rn7Kh5h67EQ";
const MAPBOX_API_URL = `https://api.mapbox.com/styles/v1/gugunner/ckdnjzx3i2ca61jmvld4f035x/tiles/256/{z}/{x}/{y}@2x?access_token=${acessToken}`;
// const API_DEV_URL = "http://localhost:5000/bootcamp-final-project/api/";
const API_DEV_URL = "https://bootcamp-final-project-app.herokuapp.com/bootcamp-final-project/api/"
export {
    acessToken,
    MAPBOX_API_URL,
    API_DEV_URL
};