import React, { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import ChatScreen from './components/ChatScreen';

/*
  I could have used router here but for the sake of simplicity i am using a conditional
*/

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <section>
      {loading ? <LoadingScreen setLoading={setLoading} loading={loading} /> : <ChatScreen />}
    </section>
  )
}
