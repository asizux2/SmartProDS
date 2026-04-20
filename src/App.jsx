import { useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CredibilityBar from './components/CredibilityBar'
import Problem from './components/Problem'
import Offer from './components/Offer'
import Portfolio from './components/Portfolio'
import CompanyIntel from './components/CompanyIntel'
import MarketResearch from './components/MarketResearch'
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

const ResearchHub = lazy(() => import('./pages/ResearchHub'))
const DashboardHub = lazy(() => import('./pages/DashboardHub'))
const ClientCRM = lazy(() => import('./pages/ClientCRM'))
const SkillsLibrary = lazy(() => import('./pages/SkillsLibrary'))
const Talabat360Dashboard = lazy(() => import('./components/dashboards/Talabat360Dashboard'))
const VodafoneEgypt360Dashboard = lazy(() => import('./components/dashboards/VodafoneEgypt360Dashboard'))

export default function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero onOpenDemo={() => setDashboardOpen(true)} />
            <CredibilityBar />
            <Problem />
            <Offer />
            <Portfolio onOpenDemo={() => setDashboardOpen(true)} />
            <CompanyIntel onOpenDashboard={setSelectedCompany} />
            <MarketResearch />
            <ClientRoster />
            <AboutMe />
            <ExpertiseStack />
            <Pricing />
            <HowItWorks />
            <FAQ />
            <CTASection />
            <Footer />

            {dashboardOpen && (
              <DashboardDemo onClose={() => setDashboardOpen(false)} />
            )}

            {selectedCompany && (
              <CompanyDashboardModal
                company={selectedCompany}
                onClose={() => setSelectedCompany(null)}
              />
            )}
          </>
        } />
        <Route path="/research/*" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <ResearchHub />
          </Suspense>
        } />
        <Route path="/dashboards/*" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <DashboardHub />
          </Suspense>
        } />
        <Route path="/crm" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <ClientCRM />
          </Suspense>
        } />
        <Route path="/skills" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <SkillsLibrary />
          </Suspense>
        } />
        <Route path="/dashboard/talabat-360" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <Talabat360Dashboard />
          </Suspense>
        } />
        <Route path="/dashboard/vodafone-egypt-360" element={
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <VodafoneEgypt360Dashboard />
          </Suspense>
        } />
      </Routes>
    </div>
  )
}