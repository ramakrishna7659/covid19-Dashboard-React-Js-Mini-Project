import './index.css'

const FaqItem = props => {
  const {faqData} = props
  const {answer, question} = faqData
  return (
    <li className="faq-item-card">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default FaqItem
