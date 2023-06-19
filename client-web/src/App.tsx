import React, { useEffect } from 'react';
import { Input } from './components/Input/Input';
import { Card } from './components/Card/Card';
import { useAppDispatch } from './store/store';
import { useLocation } from 'react-router-dom';
import { promptWordAction } from './store/word/asyncActions';
import { useSelector } from 'react-redux';
import { selectStatus, selectWord } from './store/word/selectors';
import { Status } from './store/word/types';

function App() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const status = useSelector(selectStatus);

	useEffect(() => {
		const query = location.search.split('=')[1];
		if (query) {
			dispatch(promptWordAction({
				word: query
			}));
		}
	}, []);

	return (
		<div className={'app'}>
			<Input/>
			{
				status !== Status.NEVER && <Card/>
			}
		</div>
	);
}

export default App;
