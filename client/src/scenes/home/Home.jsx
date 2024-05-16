import MainCarousel from "./MainCarousel.jsx";
import ShoppingList from "./ShoppingList.jsx"

const Home = () => {
    return (
        <div className="home">
            <MainCarousel />
            <ShoppingList />
        </div>
    );
}

export default Home;