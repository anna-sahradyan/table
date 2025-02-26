import style from './page.module.scss';
import {ChevronLeftIcon} from "../../assets/icons/ChevronLeftIcon.tsx";
import {useNavigate} from "react-router-dom";


export const ResultsComponent = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return (
        <div className={style.container}>
            <div className={style.content}>
                <h1 className={style.title}>Results</h1>
                <p className={style.text}>Order basket redesing</p>
            </div>
            <div className={style.back}>
                <button
                    className={style.btn}
                    onClick={handleClick}
                    aria-label="Вернуться на главную страницу">
                    <span className={style.backText}><ChevronLeftIcon/>Back</span></button>
            </div>
        </div>
    );
};
