import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "../ui/alert-dialog";
import { LoadingSpinner, ErrorMessage } from '../ui/common';
import { ProfileContent } from './ProfileContent';
import { SettingsContent } from './SettingsContent';
import { useUserProfile } from '../../hooks/useUser';
import { useProfileTabs } from '../../hooks/useProfileTabs';
import { mockUsers } from '../../data/mockData';

export function UserProfile() {
  const {
    user,
    loading,
    error,
    hasUnsavedChanges,
    updateUser,
    saveChanges,
    resetChanges
  } = useUserProfile(mockUsers[0]);

  const {
    activeTab,
    showUnsavedChangesDialog,
    handleTabChange,
    confirmTabChange,
    cancelTabChange
  } = useProfileTabs('profile');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value, hasUnsavedChanges)}>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileContent user={user} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsContent 
              user={user}
              onUpdateUser={updateUser}
              hasUnsavedChanges={hasUnsavedChanges}
              onSave={saveChanges}
            />
          </TabsContent>
        </Tabs>

        <AlertDialog open={showUnsavedChangesDialog} onOpenChange={cancelTabChange}>
          <AlertDialogContent>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save them before leaving?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {
                resetChanges();
                confirmTabChange();
              }}>
                Discard
              </AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                await saveChanges();
                confirmTabChange();
              }}>
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}