import React from 'react'
import './Icons.css'


function LoginIcon() {
  return (
    <div className='icon-container'>
      <i className="icon-log-in"></i>
    </div>
  )
}

function LogoutIcon() {
  return (
    <div className='icon-container'>
      <i className="icon-log-out"></i>
    </div>
  )
}

function UserIcon({ size = "" }) {
  const cName = "fa-solid fa-circle-user " + size;
  return (
    // <i className="icon-user"/>
    // <i className="fa-regular fa-user fa-lg" />
    // <i className="fa-regular fa-address-card fa-lg" style={{marginBottom: "0.3rem"}}/>
    // <i className="fa-solid fa-address-card fa-lg" style={{marginBottom: "0.3rem"}} />
    // <i className="fa-solid fa-circle-user fa-lg" style={{marginBottom: "0.3rem"}}/>
    <i className={cName} />
  )
}

function HomeIcon({ size = "" }) {
  const cName = "fa-solid fa-house-chimney " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function BookingIcon({ size = "" }) {
  const cName = "fa-solid fa-calendar-days " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function RuleIcon({ size = "" }) {
  const cName = "fa-solid fa-scale-balanced " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function CheckIcon({ size = "" }) {
  const cName = "fa-solid fa-list-check " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function MenueIcon({ size = "" }) {
  const cName = "fa-solid fa-bars " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function CreateUserIcon({ size = "" }) {
  const cName = "fa-solid fa-user-plus " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function UserListIcon({ size = "" }) {
  const cName = "fa-solid fa-users " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }} />
  )
}

function MovingOutIcon({ size = "" }) {
  const cName = "fa-solid fa-users " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }}></i>
  )
}

function StoreIcon({ size = "" }) {
  const cName = "fa-solid fa-shop " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }}></i>
  )
}

function PlusIcon({ size = "" }) {
  const cName = "fa-solid fa-plus " + size;
  return (
    <i className={cName} style={{ marginRight: "0.3rem" }}></i>
  )
}

function TapeIcon({ size = "" }) {
  const cName = "fa-solid fa-film" + size;

  return (
    <i className={cName} style={{ marginRight: "0.3rem", marginLeft: "0.3rem" }}></i>
  )
}

export { LoginIcon, LogoutIcon, UserIcon, HomeIcon, BookingIcon, RuleIcon, CheckIcon, MenueIcon, CreateUserIcon, UserListIcon, MovingOutIcon, StoreIcon, PlusIcon, TapeIcon };
