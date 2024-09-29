import React, { useEffect, useState } from 'react'

export default function AutoCountdown( { on_finish_event } ) {

    const [time, set_time] = useState(9);

    useEffect(() => {
        const interval = setInterval(() => {
            set_time((prev_time) => {
                if (prev_time == 0) {
                    on_finish_event();
                    return 0;
                } else {
                    return prev_time - 1;
                }
            })
        },1000)

        return () => clearInterval(interval);
    },[])

  return (
        <>{time}</>
  )
}
