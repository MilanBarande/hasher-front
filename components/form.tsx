import styles from '../styles/Form.module.scss'
import Image from 'next/image'
import { useState, FormEvent, SyntheticEvent } from 'react';

const API_ENDPOINT = 'https://archive-lvl-9-s7ftrbvx6q-ez.a.run.app/hash?input_user=kek';

const Form = () => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    fetch(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ hashed_input: value }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(json => console.log('json result', json))
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
          name="num"
          onChange={handleChange}
        />
        <button type="submit" value="Hash" className={styles.hasherSubmit}>Submit</button>
      </form>
      <Image src="/hash.png" alt="Hash image" width={450} height={180} />
    </div>
  )
}

export default Form
