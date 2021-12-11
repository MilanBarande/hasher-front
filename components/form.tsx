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


  return (
    <div className={styles.hasherCard}>
      <div className={styles.hasherHeader}>
        Archive level 9 Hash
      </div>
      <form onSubmit={handleSubmit} className={styles.hasherForm} >
        <input
          className={styles.hasherInput}
          placeholder="Input"
          type="text"
          onChange={handleChange}
        />
        <button type="submit" value="Hash" className={styles.hasherSubmit}>Submit</button>
      </form>
      {result ? <p className={styles.result}>{result}</p> : null}
      <div className={styles.imageContainer}>
        <Image className={styles.image} src="/hash.png" alt="Hash image" width={450} height={180} /></div>
    </div>
  )
}

export default Form
