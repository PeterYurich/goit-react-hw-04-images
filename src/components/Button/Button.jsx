import css from "./Button.module.css"
import PropTypes from 'prop-types'

export const LoadMoreBtn = ({onClick}) => (
    <button className={css.LoadMoreBtn} onClick={onClick}>Load more...</button>
)


LoadMoreBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
}