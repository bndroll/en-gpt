import styles from './Card.module.scss';
import { useSelector } from 'react-redux';
import { selectStatus, selectWord } from '../../store/word/selectors';
import { Status } from '../../store/word/types';

export const Card = () => {
	const word = useSelector(selectWord);
	const status = useSelector(selectStatus);

	return (
		<div className={styles.root}>
			{
				status === Status.LOADING ?
					(
						<div>Загрузка...</div>
					) : status === Status.ERROR ?
						(
							<div>Мы не нашли это слово в нашем банке :(</div>
						) :
					(
						<div className={styles.container}>
							<div className={styles.word}>{word?.content}</div>
							<div className={styles.pronunciation}>[{word?.pronunciation}]</div>
							<div className={styles.forms}>
								<div className={styles.title}>Forms</div>
								{
									word?.forms.map((item, i) => (<span className={styles.form} key={i}>{item}</span>))
								}
							</div>
							<div className={styles.forms}>
								<div className={styles.title}>Synonyms</div>
								{
									word?.synonyms.map((item, i) => (<span className={styles.form} key={i}>{item}</span>))
								}
							</div>
							<div className={styles.forms}>
								<div className={styles.title}>Usage examples</div>
								{
									word?.usageExample.map((item, i) => (<div key={i}>{item}</div>))
								}
							</div>
							<div className={styles.forms}>
								<div className={styles.title}>Common phrases</div>
								{
									word?.commonPhrases.map((item, i) => (<div key={i}><span className={styles.phrase}>{item.phrase}</span> - {item.meaning}</div>))
								}
							</div>
						</div>
					)
			}
		</div>
	);
};