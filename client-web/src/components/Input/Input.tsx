import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Input.module.scss';
import searchIcon from '../../assets/icons/search.svg';
import { useAppDispatch } from '../../store/store';
import { promptWordAction } from '../../store/word/asyncActions';

export const Input = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [word, setWord] = useState(location.search.split('=')[1] ?? '');
	const [searchParams, setSearchParams] = useSearchParams();

	const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setSearchParams({[name]: value});
		setWord(value);
	};

	const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			searchHandler();
		}
	};

	const searchHandler = () => {
		const query = location.search.split('=')[1];
		if (query) {
			dispatch(promptWordAction({
				word: location.search.split('=')[1]
			}));
		}
	};

	return (
		<div className={styles.root}>
			<input className={styles.input}
						 value={word}
						 name="word"
						 onChange={onChangeInputHandler}
						 onKeyDown={onKeyDownHandler}
						 placeholder={'Введите слово'}
			/>
			<button className={styles.button} onClick={searchHandler}>
				<img src={searchIcon} alt="search" width={50} height={50}/>
			</button>
		</div>
	);
};