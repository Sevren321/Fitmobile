import React, {useState} from 'react'
import SectionWrapper from './SectionWrapper'
import { WORKOUTS } from '../utils/swoldier'
import { SCHEMES } from '../utils/swoldier'
import Button from './Button'

function Header (props) {
    const { index, title, description } = props




    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-red-700'>{index}</p>
                <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
    )
}
// Dont forget props function argument
export default function Generator(props) {
    // import useState and create React Stateful variable like below
    const [showModal, setShowModal] = useState(false)

    //Destructure props out from Appjsx
    const {muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout} = props
   
    // let showModal = false

    // toggle function with logical not (!) operator
    function toggleModal() {
        setShowModal(!showModal)
    }

    function updateMuscles(muscleGroup) {

        if (muscles.includes(muscleGroup)) {
            //second click is to remove with filter
            setMuscles(muscles.filter(val => val !== muscleGroup))
            return
        }

        if (muscles.length > 2) {
            return
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup])
            setShowModal(false)
            return
        }

        

        setMuscles([...muscles, muscleGroup])
        if (muscles.length === 2) {
            setShowModal(false)
            
        }


    }


  return (
    <SectionWrapper id={'generate'} header={"generate your workout"} title={['Get', 'IN', 'there']}>
        <Header index={'01'} title={'Choose your workout'} description={"Select the exercise you wish to endure"} />
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>

            {Object.keys(WORKOUTS).map((type, typeIndex) => {
                return (
                    <button onClick={() => {
                        setMuscles([])
                        setPoison(type)
                        //set conditional styles first button is default / updates with hover effect dont forget space between quotes
                    }} className={'bg-slate-950 border px-4 py-3 rounded-lg duration-200 hover:border-red-600 ' + (type === poison ? ' border-red-600 ' : ' border-red-400')}  key={typeIndex}>
                        <p className='capitalize'>{type.replaceAll('_', " ")}</p>
                    </button>
                )
            })}
        </div>
        <Header index={'02'} title={'Lock in your targets'} description={"Select a muscle group for annihilation"} />
        <div className='bg-slate-950 border border-solid border-red-400 rounded-lg hover:border-red-600 flex flex-col '>
            <button onClick={toggleModal} className='relative py-3 flex item-center justify-center'> 
                <p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
                <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i> 
            </button>
            {showModal && (
                <div className='flex flex-col px-3 pb-3'>
                    {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                        return (
                            //must have button key to get keys which is why muscleGroupIndex was used
                            <button onClick={() => {
                                //click and add muscle groups up to 3
                                updateMuscles(muscleGroup)
                            }} key={muscleGroupIndex} className={'hover:text-red-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-red-400': ' ')}>
                                <p className='uppercase'>{muscleGroup}</p>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
        <Header index={'03'} title={'Fulfill Your Destiny'} description={"Select your ultimate objective"} />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>

            {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                return (
                    <button onClick={() => {
                        setGoal(scheme)
                        //changed type to scheme and poison to goals
                    }} className={'bg-slate-950 px-4 border py-3 rounded-lg duration-200 hover:border-red-600 ' + (scheme === goal ? ' border-red-600 ' : ' border-red-400')}  key={schemeIndex}>
                        <p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
                    </button>
                )
            })}
        </div>
        <Button func={updateWorkout} text={"Formulate"}/>


    </SectionWrapper>
        
  )
}
