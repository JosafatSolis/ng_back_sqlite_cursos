//import userRepo from '@repos/user-repo';
import sqlUserRepo from '@repos/user-repo';
import { IUser } from '@models/user-model';
import { UserNotFoundError } from '@shared/errors';



/**
 * Get all users.
 * 
 * @returns 
 */
// function getAll(): Promise<IUser[]> {
//     return userRepo.getAll();
// }

function getAll(): Promise<IUser[]> {
    return sqlUserRepo.getAll();
}

function getOne(email: string): Promise<IUser | null> {
    return sqlUserRepo.getOne(email);
}

/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
function addOne(user: IUser): Promise<void> {
    return sqlUserRepo.add(user);
}


/**
 * Update one user.
 * 
 * @param user 
 * @returns 
 */
async function updateOne(user: IUser): Promise<void> {
    const persists = await sqlUserRepo.persists(user.id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return sqlUserRepo.update(user);
}


/**
 * Delete a user by their id.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const persists = await sqlUserRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return sqlUserRepo.deleteOne(id);
}


// Export default
export default {
    getAll,
    getOne,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
