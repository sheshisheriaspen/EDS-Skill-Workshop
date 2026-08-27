import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const users = [
  { name: 'Ava Rodriguez', email: 'ava.rodriguez@example.com', role: 'Administrator', status: 'Active', lastActive: 'Today, 9:42 AM' },
  { name: 'Liam Chen', email: 'liam.chen@example.com', role: 'Editor', status: 'Active', lastActive: 'Today, 8:17 AM' },
  { name: 'Sophia Patel', email: 'sophia.patel@example.com', role: 'Viewer', status: 'Active', lastActive: 'Yesterday, 4:36 PM' },
  { name: 'Noah Williams', email: 'noah.williams@example.com', role: 'Editor', status: 'Pending', lastActive: 'Invite sent 2 days ago' },
  { name: 'Mia Thompson', email: 'mia.thompson@example.com', role: 'Viewer', status: 'Inactive', lastActive: 'Aug 18, 2026' },
]

const columnDefs = [
  { field: 'name', headerName: 'Name', flex: 1.1, minWidth: 180 },
  { field: 'email', headerName: 'Email', flex: 1.4, minWidth: 240 },
  { field: 'role', headerName: 'Role', flex: 0.8, minWidth: 150 },
  { field: 'status', headerName: 'Status', flex: 0.7, minWidth: 130 },
  { field: 'lastActive', headerName: 'Last active', flex: 1, minWidth: 190 },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main className="page-shell" id="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>Users</h1>
            <p className="page-description">Manage access and account details for your workspace.</p>
          </div>
          <sl-button variant="primary">Add user</sl-button>
        </header>

        <section className="users-section" aria-labelledby="users-heading">
          <div className="section-heading">
            <div>
              <h2 id="users-heading">All users</h2>
              <p>{users.length} users</p>
            </div>
            <sl-input
              aria-label="Search users"
              clearable
              placeholder="Search users"
              value={searchTerm}
              onSlInput={(event) => setSearchTerm(event.target.value)}
            >
              <sl-icon slot="prefix" library="material" name="search" />
            </sl-input>
          </div>

          <div className="ag-theme-alpine users-grid" aria-label="Users table">
            <AgGridReact
              columnDefs={columnDefs}
              defaultColDef={{ resizable: true, sortable: true }}
              domLayout="autoHeight"
              pagination
              paginationPageSize={10}
              rowData={users}
              quickFilterText={searchTerm}
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default App