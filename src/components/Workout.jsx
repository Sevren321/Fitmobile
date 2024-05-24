import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'

export default function Workout(props) {
    const {workout} = props
  return (
    <SectionWrapper id={'workout'} header={"Welcome to"} title={['The', 'DANGER', 'zone']}>
        <div className='fle flex-col gap-4'>
            {workout.map((exercise, i) => {
                return (
                    //key is equal to the unique index which we always have to do 
                    <ExerciseCard i={i} exercise={exercise} key={i} />
                )
            })}
        </div>
     </SectionWrapper>
  )
}
