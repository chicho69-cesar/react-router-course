import { Link, Outlet, useNavigate } from 'react-router'
import { LogOut, X } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { ContactList } from '../components/ContactList'
import { ContactDetails } from '../components/contact-details/ContactDetails'
import { checkAuth } from '@/fake/fake-data'

export default function ChatLayout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onLogout = () => {
    localStorage.removeItem('token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    navigate('/auth', { replace: true })
  };

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = localStorage.getItem('token')
      return checkAuth(token ?? '')
    },
  })

  return (
    <div className='flex h-screen bg-background'>
      <div className='w-64 border-r bg-muted/10'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-full bg-primary' />
            <Link to="/chat">
              <span className="font-semibold">
                {user?.name ?? '...'}
              </span>
            </Link>
          </div>
        </div>

        <ContactList />

        <div className="p-4 border-t">
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          <header className='h-14 border-b px-4 flex items-center justify-between'>
            <div></div> 

            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm'>
                Save conversation
              </Button>

              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </header>

          <Outlet />
        </div>

        <div className='w-80 border-l'>
          <div className='h-14 border-b px-4 flex items-center'>
            <h2 className='font-medium'>Contact details</h2>
          </div>

          <ContactDetails />
        </div>
      </div>
    </div>
  )
}

