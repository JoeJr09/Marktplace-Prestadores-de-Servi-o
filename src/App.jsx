import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom'
import { MapPin, Search, Star, ShieldCheck, Wrench, CheckCircle2, ArrowRight, Phone, Mail, Lock, ChevronDown } from 'lucide-react'
import { professionals } from './data/professionals'

const Header = ({ dark = false }) => (
  <header className={`topbar ${dark ? 'topbar-dark' : ''}`}>
    <div className="container row between center">
      <Link to="/home" className="logo">
        Acode Aqui
      </Link>
      <nav className="nav row center">
        <Link to="/services">Find a Professional</Link>
        <Link to="/plans">How it Works</Link>
      </nav>
      <div className="row center gap-sm">
        <Link className="link" to="/pro-register">
          Become a Pro
        </Link>
        <Link to="/register" className="btn btn-dark">
          Login
        </Link>
      </div>
    </div>
  </header>
)

const Footer = () => (
  <footer className="footer">
    <div className="container row between center">
      <div>
        <div className="logo light">Acode Aqui</div>
        <small>© 2024 Acode Aqui. All rights reserved.</small>
      </div>
      <div className="row gap-md footer-links">
        <a href="#">Find a Professional</a>
        <a href="#">Offer Services</a>
        <a href="#">How it Works</a>
        <a href="#">Help Center</a>
      </div>
    </div>
  </footer>
)

const Home = () => (
  <div className="page">
    <Header dark />
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Join the Elite</span>
          <h1>Build your legacy here.</h1>
          <p>Acode Aqui is the structural foundation for your business. Join a network of high-performance professionals and connect with premium urban projects.</p>
        </div>
        <div className="glass-card">
          <div className="item"><ShieldCheck size={20}/> <div><strong>Vetted Professionals</strong><p>Join 5,000+ verified experts</p></div></div>
          <div className="item"><Wrench size={20}/> <div><strong>Structural Support</strong><p>Business tools built for scale</p></div></div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
)

const Listing = () => {
  return (
    <div className="page light-bg">
      <Header />
      <div className="container listing-grid">
        <aside className="filters card">
          <h3>Filters</h3>
          <div className="field">
            <label className="field-label">Location</label>
            <div className="input row center gap-sm">
              <MapPin size={14} />
              <input className="input bare" placeholder="Enter city or zip" />
            </div>
          </div>
          <div className="field">
            <label className="field-label">Service Category</label>
            <div className="checklist">
              <label><input type="checkbox" defaultChecked /> All Services</label>
              <label><input type="checkbox" /> Plumbing</label>
              <label><input type="checkbox" /> Electrical</label>
              <label><input type="checkbox" /> Cleaning</label>
            </div>
          </div>
          <button className="btn btn-primary full">Apply Filters</button>
        </aside>
        <main>
          <div className="row between center">
            <div>
              <h2>Service Professionals</h2>
              <p className="muted">Showing {professionals.length} verified experts in your area</p>
            </div>
          </div>
          <div className="cards-grid">
            {professionals.map((pro) => (
              <Link to={`/professionals/${pro.id}`} key={pro.id} className="pro-card-link">
                <article className="pro-card card">
                  <div className="avatar" style={{ background: pro.avatarColor }} />
                  <div>
                    <div className="row between center">
                      <div>
                        <h4>{pro.name}</h4>
                        <div className="muted row center gap-xs">
                          <MapPin size={14} />
                          {pro.location}
                        </div>
                      </div>
                      <span className="badge dark">
                        <Star size={12} /> {pro.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="muted small">{pro.bioShort}</p>
                    <div className="tag-row">
                      {pro.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="btn btn-dark full">Book Consultation</button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

const Profile = () => {
  const { id } = useParams()
  const pro = professionals.find((p) => p.id === id) || professionals[0]

  return (
    <div className="page light-bg">
      <Header />
      <div className="container profile-grid">
        <section>
          <div className="card p-lg">
            {pro.isTopRated && <span className="badge">Top Rated Pro</span>}
            <h1>{pro.name}</h1>
            <p className="muted large">{pro.bioShort}</p>
            <div className="row gap-md rating-row">
              <div className="row center gap-xs">
                <Star size={18} />
                <strong>{pro.rating.toFixed(1)}</strong>
                <span className="muted small">({pro.reviewCount} reviews)</span>
              </div>
              <div className="muted row center gap-xs">
                <MapPin size={14} />
                {pro.location}
              </div>
              <div className="muted small">{pro.priceRange}</div>
            </div>
            <div className="tags">
              {pro.specialties.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <h2>Professional Bio</h2>
          <p className="muted">{pro.bioLong}</p>
          <h3 className="section-title">Service menu</h3>
          <div className="service-grid">
            {pro.services.map((service) => (
              <div key={service.name} className="card p-lg service-card">
                <div className="row between center">
                  <h4>{service.name}</h4>
                  <span className="price-chip">{service.price}</span>
                </div>
                <p className="muted small">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
        <aside className="stack">
          <div className="card p-lg">
            <div className="portrait" style={{ background: pro.avatarColor }}></div>
            <h3>Project Consultation</h3>
            <p>
              Average response time: <strong>{pro.responseTime}</strong>
            </p>
            <button className="btn btn-accent full">
              Request Quote <ArrowRight size={16} />
            </button>
          </div>
          <div className="card p-lg">
            <h4>Specialties & Tools</h4>
            {pro.specialties.map((s) => (
              <div className="row between" key={s}>
                <span>{s}</span>
                <CheckCircle2 size={16} />
              </div>
            ))}
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  )
}

const ClientRegister = () => (
  <div className="page light-bg">
    <Header />
    <div className="container split card">
      <div className="promo">
        <span className="eyebrow">Est. 2024</span>
        <h1>Construct your network.</h1>
        <p>Join the urban ecosystem of high-end professionals and services.</p>
      </div>
      <form className="form">
        <h2>Registration</h2>
        <label>Full Name<input className="input" placeholder="Architecture Smith"/></label>
        <label>Email Address<div className="input row center gap-sm"><Mail size={16}/>name@company.com</div></label>
        <label>Phone Number<div className="input row center gap-sm"><Phone size={16}/>+1 (555) 000-0000</div></label>
        <label>Password<div className="input row center gap-sm"><Lock size={16}/>••••••••</div></label>
        <button className="btn btn-dark full">Complete Registration <ArrowRight size={16}/></button>
      </form>
    </div>
    <Footer />
  </div>
)

const ProRegister = () => (
  <div className="page light-bg">
    <Header />
    <section className="hero small">
      <div className="container"><h1>Build your legacy here.</h1></div>
    </section>
    <div className="container card register-panel">
      <aside>
        <h3>Why us?</h3>
        <ol><li>Direct Access</li><li>Fast Payments</li><li>Brand Growth</li></ol>
      </aside>
      <form className="form">
        <h2>Pro Registration</h2>
        <div className="two-col">
          <label>Full Name / Business<input className="input"/></label>
          <label>Service Category<div className="input row between">Architecture & Design <ChevronDown size={16}/></div></label>
          <label>Primary Location<div className="input row center gap-sm"><MapPin size={14}/>City, Country</div></label>
          <label>Years of Experience<div className="input row between">1-3 Years <ChevronDown size={16}/></div></label>
        </div>
        <label>Professional Summary<textarea className="input" rows={4}/></label>
        <button className="btn btn-dark">Initialize Registration <ArrowRight size={16}/></button>
      </form>
    </div>
    <Footer />
  </div>
)

const Plans = () => (
  <div className="page light-bg">
    <Header />
    <section className="hero pricing">
      <div className="container">
        <span className="eyebrow">Architect your success</span>
        <h1>Scalable plans for modern professionals</h1>
      </div>
    </section>
    <div className="container price-grid">
      {[
        ['Bronze','$29','Foundational',['Standard listing visibility','5% Commission fee','Basic analytics dashboard']],
        ['Prata (Silver)','$59','Professional',['Enhanced search visibility','Priority email support','3% Commission fee']],
        ['Gold','$99','Elite Tier',['Maximum visibility boost','24/7 Priority support','1% Lower commission fees']]
      ].map(([name,price,tier,features],i) => (
        <article className={`card plan ${i===2?'featured':''}`} key={name}>
          <small>{tier}</small>
          <h3>{name}</h3>
          <div className="price">{price}<span>/month</span></div>
          <ul>{features.map(f => <li key={f}><CheckCircle2 size={14}/>{f}</li>)}</ul>
          <button className={`btn ${i===2?'btn-accent':'btn-dark'} full`}>Select {name}</button>
        </article>
      ))}
    </div>
    <Footer />
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Listing />} />
      <Route path="/professionals/:id" element={<Profile />} />
      <Route path="/register" element={<ClientRegister />} />
      <Route path="/pro-register" element={<ProRegister />} />
      <Route path="/plans" element={<Plans />} />
    </Routes>
  )
}