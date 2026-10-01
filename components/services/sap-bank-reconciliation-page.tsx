import Link from 'next/link';

const stages = [
  ['Bank Statement Integration', 'Receive structured electronic statements from supported banking institutions.'],
  ['Statement Validation', 'Validate account information, balances, currencies, references and transaction data.'],
  ['Intelligent Matching', 'Apply predefined reconciliation rules to identify corresponding SAP transactions.'],
  ['Posting & Clearing', 'Automatically process eligible transactions and clear matched accounting items.'],
  ['Exception Management', 'Route uncertain or unmatched transactions to finance teams for investigation and controlled resolution.'],
];

const capabilities = [
  ['Customer receipt matching', 'Connect incoming receipts to open customer items.'], ['Supplier payment reconciliation', 'Reconcile outgoing payments against supplier items.'],
  ['Bank charge posting', 'Apply configured posting rules to identified charges.'], ['Interest income and expense posting', 'Classify and post recognised interest entries.'],
  ['Internal bank transfer matching', 'Link transfers across configured bank accounts.'], ['Foreign currency transaction handling', 'Retain currency and exchange-rate requirements.'],
  ['Cash deposit reconciliation', 'Match deposits using references, value and account data.'], ['Direct debit reconciliation', 'Reconcile authorised debit activity consistently.'],
  ['Tax payment matching', 'Connect tax payments with applicable accounting items.'], ['Payroll clearing', 'Support controlled clearing of payroll-related entries.'],
  ['One-to-one matching', 'Match a single statement item to one open item.'], ['One-to-many matching', 'Match one statement item across multiple open items.'],
  ['Many-to-one matching', 'Consolidate multiple statement items against one item.'], ['Custom reconciliation rules', 'Model organisation-specific references and tolerances.'],
  ['Duplicate statement controls', 'Identify previously received files and statement data.'], ['Opening and closing balance validation', 'Check statement continuity and reported balances.'],
  ['Audit trail support', 'Preserve traceability across processing and resolution.'], ['Reconciliation reporting', 'Surface status, exceptions and outstanding items.'],
  ['Exception workflows', 'Route unresolved items for controlled human review.'],
];

const controls = ['Statement completeness checks', 'Duplicate-file detection', 'Duplicate transaction controls', 'Opening/closing balance validation', 'Transaction traceability', 'Controlled exception resolution', 'Reconciliation audit trails', 'User-access controls', 'Secure statement transmission', 'Approval workflows where applicable'];
const assessment = ['ISO 20022 CAMT.053 availability', 'Supported CAMT version', 'MT940 availability', 'Statement frequency', 'API availability', 'SFTP availability', 'Reference quality', 'Account identifiers', 'Counterparty information', 'Transaction codes', 'Opening and closing balances', 'Test/UAT environment availability', 'Multi-currency statement support'];
const benefits = [['Reduce Manual Reconciliation', 'Automate repetitive transaction matching and processing.'], ['Accelerate Month-End Close', 'Reduce the time finance teams spend reconciling bank accounts.'], ['Improve Financial Controls', 'Apply consistent matching, exception and validation rules.'], ['Increase Visibility', 'Provide clearer visibility of outstanding reconciliation items.'], ['Improve Auditability', 'Maintain transaction-level traceability between statements and accounting entries.'], ['Scale Across Accounts', 'Use a common framework as additional accounts, currencies or banking relationships are introduced.']];
const implementation = ['Discovery', 'SAP landscape assessment', 'Bank capability assessment', 'Statement/interface design', 'Reconciliation-rule design', 'SAP configuration/integration', 'Testing', 'User Acceptance Testing', 'Production rollout', 'Optimisation'];

function FlowCard({ title, items, automated = false }: { title: string; items: string[]; automated?: boolean }) {
  return <article className={`sap-flow-card ${automated ? 'is-automated' : ''}`}><p className="sap-kicker">{title}</p><ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}</ol></article>;
}

export function SapBankReconciliationPage() {
  return <main className="sap-service">
    <header className="sap-nav"><Link href="/" className="sap-brand">Rodent<span>.systems</span></Link><div><Link href="/services">All services</Link><Link href="/contact" className="sap-nav-cta">Contact</Link></div></header>
    <section className="sap-hero">
      <div className="sap-hero-copy"><p className="sap-kicker">SAP &amp; Enterprise Automation</p><h1>SAP Automated<br />Bank Reconciliation</h1><p className="sap-lead">Automate bank reconciliation across multiple banks, accounts and currencies directly within your SAP environment.</p><p>Rodent Lab designs and implements automated bank reconciliation workflows that reduce manual processing and enable finance teams to focus on exceptions rather than transaction-by-transaction matching.</p><div className="sap-actions"><Link href="/contact" className="btn-primary">Discuss Your SAP Environment</Link><a href="#capabilities" className="btn-secondary">Explore Capabilities</a></div></div>
      <div className="sap-hero-visual" aria-label="Bank transactions flowing through validation and matching into SAP"><div className="sap-system-node">BANKS <small>Statements</small></div><div className="sap-flow-line"><i /><i /><i /></div><div className="sap-system-node sap-node-core">SAP <small>Match · Post · Clear</small></div><div className="sap-status"><span>✓</span><div><strong>Reconciled</strong><small>Exceptions retained for review</small></div></div></div>
    </section>

    <section className="sap-section sap-transformation"><div className="sap-heading"><p className="sap-kicker">From manual to controlled automation</p><h2>Transform the reconciliation workflow.</h2></div><div className="sap-flow-grid"><FlowCard title="Traditional Process" items={['Bank Statement','Download Files','Excel / Manual Comparison','Transaction Matching','Manual Posting','Reconciliation','Finance Sign-Off']} /><FlowCard automated title="Automated Process" items={['Bank','Electronic Statement','SAP','Automatic Matching','Posting & Clearing','Exception Review','Reconciled']} /></div></section>

    <section className="sap-section"><div className="sap-heading"><p className="sap-kicker">How it works</p><h2>A clear path from statement to reconciliation.</h2></div><div className="sap-stage-grid">{stages.map(([title, description], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="sap-section sap-dark"><div className="sap-standard-grid"><div><p className="sap-kicker">Electronic statement standards</p><h2>Structured data in.<br />Reliable processing out.</h2><p>Statement integration is designed around structured, validated transaction data.</p></div><article className="sap-feature-standard"><span>Preferred format</span><h3>ISO 20022<br />CAMT.053</h3><p>Structured end-of-day electronic bank statements.</p></article><ul><li><strong>CAMT.052</strong>Intraday reporting</li><li><strong>CAMT.054</strong>Debit and credit notifications</li><li><strong>SWIFT MT940</strong>Supported legacy bank statement format</li><li><strong>Bank-specific</strong>Structured formats where requirements permit</li></ul></div><p className="sap-note">Available integrations depend on the capabilities and statement formats supported by each banking institution.</p></section>

    <section className="sap-section sap-currencies"><div className="sap-currency-orbit" aria-label="Example configured currencies"><span>USD</span><span>ZWG</span><span>ZAR</span><span>EUR</span><span>GBP</span><strong>+ Other configured currencies</strong></div><div><p className="sap-kicker">Multi-bank · Multi-currency</p><h2>One reconciliation framework. Multiple currencies. Multiple banks.</h2><p>Configure a consistent SAP reconciliation process across bank accounts and currencies while retaining the accounting, exchange-rate and control requirements applicable to each account.</p></div></section>

    <section className="sap-section" id="capabilities"><div className="sap-heading"><p className="sap-kicker">Reconciliation capabilities</p><h2>Designed around real finance operations.</h2></div><div className="sap-capability-grid">{capabilities.map(([title, description]) => <article key={title}><i>✓</i><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="sap-section sap-matching"><div className="sap-heading"><p className="sap-kicker">Intelligent Matching Rules</p><h2>Match with context, not guesswork.</h2><p>Rules may combine payment references, bank transaction IDs, SAP document numbers, invoice numbers, amounts, currencies, counterparties, bank accounts, booking dates, value dates and configurable tolerances.</p></div><div className="sap-match-demo"><div><span>Bank Transaction</span><strong>Reference: INV-45821</strong><strong>Amount: USD 12,500</strong></div><b>→</b><div className="engine"><span>Matching Engine</span><strong>Reference + amount</strong></div><b>→</b><div><span>SAP Open Item</span><strong>Invoice: INV-45821</strong><strong>Amount: USD 12,500</strong></div><b>→</b><div className="matched">✓ Matched &amp; Cleared</div></div><aside>Transactions that do not satisfy defined matching criteria remain exceptions rather than being force-matched.</aside></section>

    <section className="sap-section sap-exceptions"><div><p className="sap-kicker">Exception Management</p><h2>Manage Exceptions, Not Every Transaction</h2><p>Finance teams spend time reviewing transactions that genuinely require human judgement, while eligible matches continue through the defined workflow.</p></div><article className="sap-exception-card"><header><span>Status</span><b>Unmatched</b></header><dl><div><dt>Amount</dt><dd>USD 24,750</dd></div><div><dt>Reference</dt><dd>ABC785421</dd></div><div><dt>Reason</dt><dd>No exact SAP open-item match identified.</dd></div></dl><footer>{['Review suggested matches','Assign','Investigate','Resolve'].map(x => <span key={x}>{x}</span>)}</footer><small>Illustrative exception workflow</small></article></section>

    <section className="sap-section sap-split"><div><p className="sap-kicker">Security and controls</p><h2>Controls embedded throughout the flow.</h2><p>Control design is aligned to the organisation’s SAP environment, policies and approval model.</p></div><ul className="sap-check-list">{controls.map(x => <li key={x}>✓ {x}</li>)}</ul></section>

    <section className="sap-section sap-connect"><div><p className="sap-kicker">Bank Connectivity</p><h2>Choose the right connection for each environment.</h2><p>Connectivity architecture is selected based on the organisation&apos;s SAP landscape, security requirements and the electronic banking capabilities available from each bank.</p></div><div className="sap-connect-methods">{['Secure APIs','SFTP','SWIFT connectivity','SAP-supported banking connectivity options','Controlled file-based integration'].map(x => <span key={x}>{x}</span>)}</div></section>

    <section className="sap-section sap-readiness"><div className="sap-heading"><p className="sap-kicker">Bank Readiness Assessment</p><h2>We Assess Your Banks Before Integration</h2><p>We assess whether each bank can provide suitable structured statements and the information needed for dependable reconciliation.</p></div><div className="sap-assessment">{assessment.map((x,i) => <div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></section>

    <section className="sap-section"><div className="sap-heading"><p className="sap-kicker">Business outcomes</p><h2>Less repetitive processing. Greater financial visibility.</h2></div><div className="sap-benefits">{benefits.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="sap-section sap-implementation"><div className="sap-heading"><p className="sap-kicker">Implementation approach</p><h2>From discovery to continuous optimisation.</h2></div><ol>{implementation.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</li>)}</ol></section>

    <section className="sap-final"><p className="sap-kicker">Start the conversation</p><h2>Ready to automate your bank reconciliation process?</h2><p>Talk to Rodent Lab about your SAP environment, banking relationships, currencies and current reconciliation process.</p><div className="sap-actions"><Link href="/contact" className="btn-primary">Discuss Your SAP Environment</Link><Link href="/contact" className="btn-secondary">Contact Rodent Lab</Link></div></section>
    <footer className="sap-footer"><Link href="/">Rodent</Link><p>Engineering systems for real operations.</p><div><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></div></footer>
  </main>;
}
