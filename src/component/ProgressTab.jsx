import '../style/progresstab.css'

function ProgressTab() {
    return (
    <aside className='progresstab'>
        <h3 className='progresstab'>Progress</h3>
        <ul className='progresstab'>
            <li><a className='progresstab' href="/QuestionDiagnose">Diagnose</a></li>
            <li><a className='progresstab' href="/ExerciseList">Exercise List</a></li>
            <li><a className='progresstab' href="/DoExercise">Exercise!!</a></li>
            <li><a className='progresstab' href="/Recommend">Summary</a></li>
        </ul>
    </aside>
    );
}
export default ProgressTab;