import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CredibilityBar from './components/CredibilityBar'
import Problem from './components/Problem'
import Offer from './components/Offer'
import Portfolio from './components/Portfolio'
import CompanyIntel from './components/CompanyIntel'
import ClientRoster from './components/ClientRoster'
import AboutMe from './components/AboutMe'
import ExpertiseStack from './components/ExpertiseStack'
import Pricing from './components/Pricing'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import DashboardDemo from './components/DashboardDemo'
import CompanyDashboardModal from './components/CompanyDashboardModal'

export default function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <Navbar />
      <Hero onOpenDemo={() => setDashboardOpen(true)} />
      <CredibilityBar />
      <Problem />
      <Offer />
      <Portfolio onOpenDemo={() => setDashboardOpen(true)} />
      <CompanyIntel onOpenDashboard={setSelectedCompany} />
      <ClientRoster />
      <AboutMe />
      <ExpertiseStack />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <CTASection />
      <Footer />

      {/* Fuel Station Mystery Shopping demo */}
      {dashboardOpen && (
        <DashboardDemo onClose={() => setDashboardOpen(false)} />
      )}

      {/* Company Intel tailored dashboard modal */}
      {selectedCompany && (
        <CompanyDashboardModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  )
}
