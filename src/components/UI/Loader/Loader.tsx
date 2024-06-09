import styles from "./loader.module.css";

const Loader = () => {
    const { loaderContainer, loaderAnimation } = styles;
    return (
        <div className={loaderContainer}>
            <div className={loaderAnimation} />
        </div>
    );
}

export default Loader;
