import styles from '../styles/Form.module.scss'
import Image from 'next/image'
import { useState, FormEvent, SyntheticEvent } from 'react';

const API_ENDPOINT = 'https://archive-lvl-9-s7ftrbvx6q-ez.a.run.app/hash';

const Form = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    fetch(`${API_ENDPOINT}?input_user=${value}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', mode: 'cors' },
    }).then(res => res.json()).then(json => setResult(json.hashed_input))
  }

  const handleChange = (event: FormEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value)

  const [isCopySuccessful, setIsCopySuccesful] = useState(false);

  function updateClipboard(newClip: string) {
    navigator.clipboard.writeText(newClip).then(function () {
      setIsCopySuccesful(true)
    }, function () {
      setIsCopySuccesful(false)
    });
  }

  return (
    <div className={styles.hasherCard}>
      <h1 className={`${styles.hasherHeader} glitch`} data-text="Archive level 9 Hash" />
      <form onSubmit={handleSubmit} className={styles.hasherForm}>
        <input
          className={styles.hasherInput}
          placeholder="Input"
          type="text"
          onChange={handleChange}
        />
        <button type="submit" className={styles.hasherSubmit}>Hash</button>
      </form>
      {result ?
        <div className={styles.result}>
          <p className={styles.resultText}>{`I hope for you that you are sure about your input... if so, I don't need to explain you where to type: !submit_hash ${result}`}</p>
          <button className={styles.hasherSubmit} onClick={() => updateClipboard(`!submit_hash ${result}`)}>{isCopySuccessful ? 'Copied ✅' : 'Copy to clipboard'}</button>
        </div> :
        <p className={styles.result}>
          Your input ? Some characters, a hashtag and some numbers... you got it ?
        </p>
      }
    </div>
  )
}

export default Form
