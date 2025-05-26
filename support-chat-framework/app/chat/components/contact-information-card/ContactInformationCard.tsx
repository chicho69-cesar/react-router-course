import { useLoaderData, useNavigation, useParams } from 'react-router';

import type { Client } from '~/chat/interfaces/chat.interface';
import { ContactInformation } from './ContactInformation';
import { ContactInformationSkeleton } from './ContactInformationSkeleton';
import { NoContactSelected } from './NoContactSelected';

export const ContactInformationCard = () => {
  const { id } = useParams();
  const { clients = [], client } = useLoaderData();
  const { state } = useNavigation();

  const isPending = state === 'loading';

  if (client) {
    return <ContactInformation client={client} />;
  }

  if (isPending) {
    return <ContactInformationSkeleton />;
  }

  if (!id) {
    return <NoContactSelected />;
  }

  if (!client) {
    return <NoContactSelected />;
  }

  return <ContactInformation client={client} />;
};
