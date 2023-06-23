import styles from './Card.module.scss';
import { useSelector } from 'react-redux';
import { selectStatus, selectWord } from '../../store/word/selectors';
import { Status } from '../../store/word/types';
import { CardSkeleton } from './CardSkeleton';
import ponyLogo from '../../assets/images/pony.png';

export const Card = () => {
	const word = useSelector(selectWord);
	const status = useSelector(selectStatus);

	return (
		<div className={styles.root}>
			{
				status === Status.LOADING ?
					(
						<CardSkeleton />
					) : status === Status.ERROR ?
						(
							<div>Мы не нашли это слово в нашем банке :(</div>
						) :
					(
						<div className={styles.container}>
							<div className={styles.word}>{word?.content}</div>
							<div className={styles.pronunciation}>{word?.pronunciation}</div>
							{word?.content !== word?.initialForm && <div className={styles.pronunciation}>Infinitive - <span>{word?.initialForm}</span></div>}
							<div className={styles.forms}>
								<div className={styles.title}>Forms</div>
								{
									word?.forms.map((item, i) => (<div className={styles.form} key={i}>{item.form} <span className={styles.optText}>{item.pronunciation}</span></div>))
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
									word?.usageExample.map((item, i) => (<div key={i}>{item.example} <span className={styles.optText}>({item.partOfSpeech})</span></div>))
								}
							</div>
							<div className={styles.forms}>
								<div className={styles.title}>Common phrases</div>
								{
									word?.commonPhrases.map((item, i) => (<div key={i}><span className={styles.phrase}>{item.phrase}</span> - {item.meaning}</div>))
								}
							</div>
							<img className={styles.pony} src={ponyLogo} alt="logo" width={100} height={100}/>
						</div>
					)
			}
		</div>
	);
};