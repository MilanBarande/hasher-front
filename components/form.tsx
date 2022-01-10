import styles from '../styles/Form.module.scss'
import { useState, FormEvent, SyntheticEvent } from 'react';

const API_ENDPOINT = 'https://archive-lvl-9-s7ftrbvx6q-ez.a.run.app/hash';

const Form = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopySuccessful, setIsCopySuccesful] = useState(false);
  const [isCopyInError, setIsCopyInError] = useState(false);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(`${API_ENDPOINT}?input_user=${value}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', mode: 'cors' },
    }).then(res => res.json()).then(json => { setResult(json.hashed_input); setIsLoading(false); })
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value)

  const updateClipboard = (newClip: string) => {
    navigator.clipboard.writeText(newClip).then(() => {
      setIsCopySuccesful(true);
    }, () => {
      setIsCopyInError(true);
    });
  }

  const handleCopyClick = () => updateClipboard(`!submit_hash ${result}`);

  return (
    <div className={styles.hasherCard}>
      <div className={styles.titleContainer}><h1 className={`${styles.title} glitch`} data-text="Archive level 8" >Archive level 8</h1></div>
      <form onSubmit={handleSubmit} className={styles.hasherForm}>
        <input
          className={styles.hasherInput}
          placeholder="Input"
          type="text"
          onChange={handleChange}
        />
        <button type="submit" className={styles.hasherSubmit}>Hash</button>
      </form>
      {
        isLoading ? <div className={styles.spinnerContainer}><div className={styles.spinner}><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div> :
          result ?
            <div className={styles.result}>
              <p>I hope for you that you are sure about your input... if so, I don't need to explain you where to type:</p>
              <div className={styles.commandContainer}><span className={styles.command}>{`!submit_hash ${result}`}</span></div>
              <button className={styles.copyToClipboard} onClick={handleCopyClick}>{isCopyInError ? 'Oops something went wront, gotta do it manually' : isCopySuccessful ? 'Copied ✅' : 'Copy to clipboard'}</button>
            </div> :
            <p className={styles.result}>
              Your input? Some characters, a hashtag and some numbers... you got it?
            </p>
      }
    </div>
  )
}

export default Form
